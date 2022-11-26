function Validator(formSelector) {
    var _this = this;
    var formRules = {};

    function getParent(element, selector) {
        while (element.parentElement) {
            if(element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    // Quy ước tạo rule: 
    //  - Nếu có lỗi thì return `error message`
    // - Nếu không có lỗi thì return undefined
    
    // Object lưu các rules
    var validatorRules = {
        required: function(value) {
            return value ? undefined : 'Vui lòng nhập trường này';
        },
        email: function(value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return value.match(regex) ? undefined : 'Vui lòng nhập email';
        },
        min: function(min) {
            return function(value) {
                return value.length >= min ? undefined : `Độ dài tối thiểu ${min}`;
            }
        },
        max: function(max) {
            return function(value) {
                return value.length <= max ? undefined : `Độ dài tối thiểu ${max}`;
            }
        },
    };

    // Lấy ra form element trong DOM  theo form element
    var formElement = document.querySelector(formSelector);
    // console.log(formElement)

    // Chỉ xử lý khi có Element trong DOM
    if(formElement) {
        var inputs = formElement.querySelectorAll('[name][rules]');
        
        for(var input of inputs) {

            var rules = input.getAttribute('rules').split('|');
            for(var rule of rules) {
                var ruleInfo;
                var isRuleHasvalue = rule.includes(':');
                
                if(isRuleHasvalue) {
                    ruleInfo = rule.split(':');
                    rule = ruleInfo[0];
                }

                var ruleFunc = validatorRules[rule];
                if(isRuleHasvalue) {
                    ruleFunc = ruleFunc(ruleInfo[1]);
                }

                if (Array.isArray(formRules[input.name])) {
                    formRules[input.name].push(ruleFunc);
                }
                else {
                    formRules[input.name] = [ruleFunc];
                }
            }

            // Lắng nghe sự kiện để validate
            input.onblur = handleValidate;
            input.oninput = handleClearError;
        }

        // Hàm thực hiện validate
        function handleValidate(event) {
            var rules = formRules[event.target.name];
            var errorMessage;
            for (var rule of rules) {
                errorMessage =  rule(event.target.value);
                if (errorMessage) break;
            }
            // console.log(errorMessage);

            // Nếu có lỗi thì hiển thị ra UI
            if (errorMessage) {
                var  formGroup = getParent(event.target, '.form-group');
                if (formGroup) {
                    formGroup.classList.add('invalid');
                    var formMessage = formGroup.querySelector('.form-message');
                    if(formMessage) {
                        formMessage.innerText = errorMessage;
                    }
                }
            }
            return !!errorMessage; // Có lỗi thì trả về true || không có lỗi thì trả về false
        }
        
        // Hàm clear messages lỗi
        function handleClearError(event) {
            var formGroup = getParent(event.target, '.form-group');
            if (formGroup.classList.contains('invalid')) {
                formGroup.classList.remove('invalid');

                var formMessage = formGroup.querySelector('.form-message');
                if(formMessage) {
                    formMessage.innerText = '';
                }
            }
        }

        // Xử lý hành vi submit form
        formElement.onsubmit = function(e) {
            e.preventDefault();

            var inputs = formElement.querySelectorAll('[name][rules]');
            var isValid = true;
            for (var input of inputs) {
                if(handleValidate({target: input}))
                {
                    isValid = false;
                }
            }

            // Khi không có lỗi thì submit form
            if(isValid) {

                if(typeof _this.onSubmit === 'function') {
                    var enableInputs = formElement.querySelectorAll('[name]:not([disabled])');

                    var formValues = Array.from(enableInputs).reduce(function(values, input) {
                        switch(input.type) {
                            case 'checkbox':
                                if (!input.matches(':checked')) {
                                    values[input.name] = [];
                                    return values;
                                }
                                if (Array.isArray(values[input.name])) {
                                    values[input.name] = [];
                                }
                                values[input.name].push(input.value);
                                break;
                            case 'radio':
                                values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked');
                                break;
                            case 'file':
                                values[input.name] = input.files;
                                break;
                            default:
                                values[input.name] = input.value;
                        }
                        return values;
                    }, {});
                    // Gọi lại hàm onSubmit và trả về giá trị của form 
                    _this.onSubmit(formValues);
                } else {
                    formElement.submit();
                }
                
            } 
        }
    }
}

// Cách gọi trong html

{/* <script>
      var form = new Validator('#register-form');
      form.onSubmit = function (formData) {
        console.log(formData);
      }
</script> */}