const Router = window.ReactRouterDOM.BrowserRouter;
const Route =  window.ReactRouterDOM.Route;
const Link =  window.ReactRouterDOM.Link;
const Prompt =  window.ReactRouterDOM.Prompt;
const Switch = window.ReactRouterDOM.Switch;
const Redirect = window.ReactRouterDOM.Redirect;

const routing = (
    <Router>
        <div>
            <Route path="/bid" component={Welcome}/>
            <Route path="/" component={Bid}/>
        </div>
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'));
