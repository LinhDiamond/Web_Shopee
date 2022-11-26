import html from '../core.js'
import { connect } from '../store.js'
import Header from '../compenent/Header.js'
import TodoList from '../compenent/TodoList.js'
import Footer from '../compenent/Footer.js'

function App({ todos }) {
    return html `
        <section class="todoapp">
            ${Header()}
            ${todos.length>0 && TodoList()}
            ${todos.length>0 && Footer()}
        </section>
    `
}

export default connect()(App)
