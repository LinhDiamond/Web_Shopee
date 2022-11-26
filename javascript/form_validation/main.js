// Đối tượng 'Validator'
function Validator(options) {
    function getParent(element, selector) {
        while (element.parentElement) {
            if(element.parentElement.matches(selector))
            {
                return element.parentElement;
            }
            element = element.parentElement; 
        }
    }

    var selectorRules = {};
    
    function validate(inputElement, rule) {

        // Hàm
        var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
        var errorMessage;
        
        // Lấy ra các rules của selector
        var rules = selectorRules[rule.selector];
        // Lặp qua từng rules và kiểm tra
        for(var i = 0; i < rules.length; i++) {
            switch (inputElement.type) {
                case 'radio':
                case 'checkbox':
                    errorMessage = rules[i](
                        formElement.querySelector(rule.selector + ':checked')
                    );
                    break;
                default:
                    errorMessage = rules[i](inputElement.value);

            };
            if(errorMessage) break;
        }
        
        if(errorMessage) {
            errorElement.innerText = errorMessage;
            getParent(inputElement, options.formGroupSelector).classList.add('invalid');
        }
        else {
            errorElement.innerText = '';
            getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
        }

        return !!errorMessage; //Có lỗi trả về true, không có lỗi trả về false
    };
    
    
    var formElement = document.querySelector(options.form);
    if(formElement) {

        // Khi submit form 
        formElement.onsubmit = function(e) {
            e.preventDefault();

            var isFormValid = true;

            // Thực hiện lặp qua từng rules và validate
            options.rules.forEach((rule) => {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid =  validate(inputElement, rule);
                if(isValid) {
                    isFormValid = false;
                }
            });
            
            if(isFormValid) {
                // Trường hợp submit với js
                if(typeof options.onSubmit === 'function') {
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
                    options.onSubmit(formValues);
                }
                // trường hợp submit với hành vi mặc định
                else {
                    // submit với hành vi mặc định của trình duyệt
                    formElement.submit();
                }
            }
        };

        // Lặp qua mỗi rule và xử lý 
        options.rules.forEach((rule) => {

            // Lưu lại các rule cho mỗi input
            if(Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            }
            else {
                selectorRules[rule.selector] = [rule.test];
            }

            var inputElements = formElement.querySelectorAll(rule.selector);
            Array.from(inputElements).forEach(function (inputElement) {
                var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);

                // Xử lý trường blur ra khỏi input
                inputElement.onblur = () => {
                    validate(inputElement,rule);
                }

                // Xử lý mỗi khi user nhập vào input
                inputElement.oninput = () => {
                    errorElement.innerText = '';
                    getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
                }

                inputElement.onchange = () => {
                    validate(inputElement,rule);
                }
            });
        });  
        
    }
}






// Định nghĩa các rules
Validator.isRequired = function(selector) {
    return {
        selector,
        test: function(value) {
            // if(value.trim() === '') {
            //     return 'Vui lòng nhập trường này';
            // }
            return value ? undefined : 'Vui lòng nhập trường này';
        }
    }
}

Validator.isEmail = function(selector) {
     return {
        selector,
        test: function(value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return value.match(regex) ? undefined : 'Trường này phải là email';
        }
    }
}

Validator.minLength = function(selector, min) {
    return {
       selector,
       test: function(value) {
           return value.length >= min ? undefined : `Độ dài mật khẩu tối thiểu ${min} ký tự` ;
       }
   }
}

Validator.isConfirmed  = function (selector, getConfirmValue, message) {
    return {
        selector,
        test: function(value) {
            return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác';
        }
    }
}