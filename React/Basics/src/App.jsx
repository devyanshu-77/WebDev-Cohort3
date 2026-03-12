import Student from "./Student";
// props = read-only properties that are shared between components 

const App = () => {
    return (
        <>
            <Student name="Spongebob" age={30} isStudent={true}/>
            <Student name="Patrick" age={42} isStudent={false}/>
            <Student name="Squidward" age={50} isStudent={false}/>
            <Student name="Sandy" age={27} isStudent={true}/>
        </>
    );
};

export default App;
