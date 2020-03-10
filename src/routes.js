import AgentForm from './components/AgentForm';
import App from './App';
export default[
    {path: '/', component : App},
    {path : '/update/:agentid', component:AgentForm}
]