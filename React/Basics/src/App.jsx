import "./index.css"
import UserGreeting from "./UserGreeting";

const App = () => {
    return (
        <>
            <UserGreeting isLoggedIn={false} userName="BroCode" />
        </>
    );
};

export default App;
