const Router = window.ReactRouterDOM.BrowserRouter;
const Route =  window.ReactRouterDOM.Route;
const Redirect = window.ReactRouterDOM.Redirect;

const routing = (
    <Router>
        <Redirect from="/" to="/welcome"/>
        <Route path="/">
            <Route path="/welcome" component={Welcome}/>
            <Route  path="/bid" component={Bid}/>
        </Route>
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'));
