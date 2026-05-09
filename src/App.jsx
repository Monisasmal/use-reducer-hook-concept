import { Component, useState, useEffect, useReducer,} from "react";


// Intro
function Intro(){
  return(
    <div style={{background:"blue", padding:"10px", borderRadius:"5px", color:"white"}}>
     <h2>What is useReducer?</h2>
     <p>useReducer is a React Hook that helps manage complex state logic.</p>
     <h3>📦 Basic Syntax:</h3>
     <strong>const [state, dispatch] = useReducer(reducer, initialState);</strong>
      <ol type="1">
        <li>state → current value (like count)</li>
        <li>dispatch → function used to send actions (like “INCREMENT” or “DECREMENT”)</li>
        <li>reducer → a function that decides how to update the state</li>
        <li>initialState → starting value</li>
      </ol>
      <h2>What is payload?</h2> 
      <bold>Payload = the data you send to update the state</bold>
      <p>Think of dispatch as sending a parcel to the reducer.</p>
      <ul>
        <li>type = label on parcel (what action to do)</li>
        <li>payload = actual content inside parcel (data needed to do action)</li>
      </ul>
    </div>
  )
}



// 1. Counter Basic:----------------------

function Counter(){
  const initialState = {count:0};

  function reducer(state,action){
    switch(action.type){
      case  "INCREMENT" :
        return {count : state.count + 1};
      case "DECREMENT" :
        return {count : state.count > 0 ? state.count-1 : 0};
      case "RESET":
        return { count:0}
      default: 
      return state;
    }
  }

  const[state,dispatch] = useReducer(reducer,initialState);

  const btn = {
    padding: "10px 20px",
    fontSize: "16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    margin:"10px 10px",
    background:"pink"
  };

  const getColor = () =>{
    if(state.count === 0) return "#000";
    else if(state.count > 0 && state.count < 10) return "red";
    else if(state.count >=10 && state.count <30) return "green";
  }

  return(
    <div style={{ textAlign: "center", marginTop: "30px", }}>
      <h2  style={{color:getColor()}}>Count:{state.count}</h2>
      <button style={btn} onClick={() => dispatch({type:"INCREMENT"})}>+</button>
      <button  style={btn} onClick={() => dispatch({type:"DECREMENT"})}>-</button>
      <button style={btn} onClick={() => dispatch({type:"RESET"})}>reset</button>
    </div>
  )

}

// 2. TODO using useReducer:-------------------------------------------------------------------

const styles = {
  container: {
    textAlign: "center",
    marginTop: "40px",
    background: "#f7f9fc",
    width: "400px",
    marginInline: "auto",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
    transition: "all 0.3s ease",
  },
  heading: {
    color: "#333",
    marginBottom: "20px",
    fontSize: "24px",
  },
  inputArea: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
  },
  input: {
    width: "60%",
    padding: "10px",
    fontSize: "16px",
    border: "2px solid #ccc",
    borderRadius: "8px",
    outline: "none",
  },
  addBtn: {
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "10px 14px",
    fontSize: "14px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
    margin:"10px 10px"
  },
  clearBtn: {
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "10px 14px",
    fontSize: "14px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
     margin:"10px 10px",
  },
  list: {
    listStyle: "none",
    padding: 0,
    marginTop: "20px",
  },
  item: {
    background: "white",
    margin: "8px auto",
    padding: "10px 15px",
    borderRadius: "8px",
    width: "80%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
  },
  deleteBtn: {
    backgroundColor: "#ff5252",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "6px 10px",
    cursor: "pointer",
    fontSize: "14px",
  },
  emptyText: {
    color: "#888",
    fontStyle: "italic",
    marginTop: "10px",
  },

};

function getResponsiveStyle() {
  if (window.innerWidth <= 480) {
    return {
      container: { ...styles.container, width: "90%", padding: "15px" },
      input: { ...styles.input, width: "100%" },
      addBtn: { ...styles.addBtn, width: "100%" },
      clearBtn: { ...styles.clearBtn, width: "100%" },
      item: { ...styles.item, width: "100%", fontSize: "15px" },
    };
  } else if (window.innerWidth <= 768) {
    return {
      container: { ...styles.container, width: "80%" },
      input: { ...styles.input, width: "70%" },
    };
  }
  return styles;
}


function Todo(){

 
  const[text,setText] = useState("");
  const[screenStyle, setScreenStyle] = useState(getResponsiveStyle());


  useEffect(()=>{
    const handleResize = () => setScreenStyle(getResponsiveStyle());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize)
  },[]);

  const initialState = [];

  function reducer(state,action){
   switch(action.type){
    case "ADD_TODO" : 
    return [...state, {id:Date.now(), text:action.payload}];
    case "DELETE_TODO" :
      return state.filter((todo)=> todo.id !== action.payload)
      case "CLEAR_ALL" : return [];
      default: return state;
   }
   
  }

  const [todo, dispatch] = useReducer(reducer,initialState);

  const handleAdd = () =>{
    const trimmed = text.trim();
    if(trimmed === ''){
      alert("Please enter a task!");
      return;
    }
    const isDuplicate = todo.some((todo) => todo.text.toLowerCase() === trimmed.toLowerCase());
    if(isDuplicate){
      alert("Task already exists!");
      return;
    }
    dispatch({type:"ADD_TODO", payload: trimmed});
    setText("");
  }

  const handleClearAll = () =>{
    if(todo.length === 0){
      alert("No tasks to clear!");
      return;
    }
    const comfrimClear = window.confirm("Are you sure you want to clear all tasks?")
    if(comfrimClear) dispatch({type:"CLEAR_ALL"});
  }


  return(
     <div style={screenStyle.container}>
       <h2 style={styles.heading}>✅ Todo List</h2>
       <div style={styles.inputArea}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter a task"
          style={screenStyle.input}
        />
        </div>
        <button  style={screenStyle.addBtn} onClick={handleAdd}>ADD</button>
        <button  style={screenStyle.clearBtn} onClick={handleClearAll}>Clear ALL</button>

        <ul>
          {todo.length === 0 ? (<p style={styles.emptyText}>No tasks yet 📝</p>) : (
            todo.map((todos) => (
              <li key={todos.id} style={screenStyle.item}>
                {todos.text}
                <button style={styles.deleteBtn} onClick={() => dispatch({type:"DELETE_TODO",  payload: todos.id})}>❌</button>
              </li>
            ))
          )}
        </ul>
     </div>
  )
}


// 3. Form using Reducer:----------------------------------------------------------------------------------

function ValidForm(){

    const formContainer = {
    width:"700px",
    margin: "50px auto",
    padding: "30px",
    border: "2px solid #ddd",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    backgroundColor: "#fdfdfd",
  };

  const labelStyle = {
    display: "block",
    textAlign: "left",
    marginBottom: "6px",
    fontWeight: "bold",
    color: "#333",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#007bff",
    color: "white",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const errorStyle = {
    color: "red",
    marginBottom: "15px",
    fontWeight: "bold",
  };

  const headingStyle = {
    textAlign: "center",
    marginBottom: "25px",
    color: "#111",
  };

  const cardStyle = {
    width:"700px",
    margin: "30px auto",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#e8f0fe",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "left",
  };

  const cardTitle = {
    textAlign: "center",
    color: "#222",
    fontWeight: "bold",
    marginBottom: "15px",
  };
  
  const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    phone: "",
    gender: "",
  }

  function reducer(state,action){
    switch (action.type) {
      case "UPDATE_FIELD":
        return { ...state, [action.field]: action.value };
      case "RESET_FORM":
        return initialState;
      default:
        return state;
    }
  }

  const handleChange = (e) =>{
    dispatch({
      type: "UPDATE_FIELD",
      field: e.target.name,
      value: e.target.value,
    });
  }

  const validateForm = () =>{
    
    const { name, email, password, confirmPassword, age, phone, gender } = state;
    if (!name || !email || !password || !confirmPassword || !age || !phone || !gender) {
      return "⚠️ All fields are required!";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "❌ Invalid email format!";
    }
    if(password.length<6){
      return "🔒 Password must be at least 6 characters!";
    }
    if(password !== confirmPassword){
      return "🚫 Passwords do not match!";
    }
    if (isNaN(age) || age < 1) {
      return "👶 Please enter a valid age!";
    }
    if (!/^\d{10}$/.test(phone)) {
      return "📞 Phone number must be 10 digits!";
    }
    return "";
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    const validError = validateForm();
    if(validError){
      setError(validError);
      setSubmittedData(null);
      return;
    }
    setError("");
    setSubmittedData(state);
   dispatch({ type: "RESET_FORM" });
  }

  const [state, dispatch] = useReducer(reducer,initialState);
  const[error,setError] = useState("");
  const[submittedData, setSubmittedData] = useState(null);

  return(
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <form onSubmit={handleSubmit} style={formContainer}>
      <h2 style={headingStyle}>📝 Registration Form</h2>
      {error && <p style={errorStyle}>{error}</p>}
      <label style={labelStyle}>Full Name</label>
      <input name="name" value={state.name} onChange={handleChange} placeholder="Enter your name" style={inputStyle}/>
      <label style={labelStyle}>Email</label>
      <input name="email" type="email" value={state.email} onChange={handleChange} placeholder="Enter ur Email"  style={inputStyle}/>
      <label style={labelStyle}>Password</label>
      <input name="password" type="password" value={state.password} onChange={handleChange} placeholder="Enter ur Password"  style={inputStyle}/>
      <label style={labelStyle}>Comfirm Password</label>
      <input name="confirmPassword" type="password" value={state.confirmPassword} onChange={handleChange} placeholder="re-enter Password"  style={inputStyle}/>
      <label style={labelStyle}>Age</label>
      <input name="age" type="number" value={state.age} onChange={handleChange} placeholder="enter Age"  style={inputStyle}/>
      <label style={labelStyle}>Phone Number</label>
      <input name="phone" type="tel" value={state.phone} onChange={handleChange} placeholder="enter PhoneNumber"  style={inputStyle}/>
      <label style={labelStyle}>Gender</label>
      <select name="gender"  value={state.gender} onChange={handleChange}  style={inputStyle}> 
        <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
      </select>
      <button type="submit"  style={buttonStyle}>Submit</button>
    </form>

    {submittedData && (
      <div style={cardStyle}>
        <h3 style={cardTitle}>🎉 Registration Successful!</h3>
          <p><strong>Name:</strong> {submittedData.name}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Age:</strong> {submittedData.age}</p>
          <p><strong>Phone:</strong> {submittedData.phone}</p>
          <p><strong>Gender:</strong> {submittedData.gender}</p>
      </div>
    )}
    
    </div>
  )

}

const projects = [
  {
    category: "Basic",
    items: [
      {id:1, name: "Introduction", Component: <Intro />},
      {id:2, name: "COUNTER", Component: <Counter />},
      {id:3, name: "TODO", Component: <Todo />},
      {id:4, name: "FORM", Component: <ValidForm />},
    ],
  },
  {
    category: "Intermediate",
    items: [

    ],
  },
  {
    category: "Advanced",
    items: [
      
    ],
  },
];


export default function App() {
  const [activeProject, setActiveProject] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Responsive handling for hamburger
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarStyle = {
    width: "250px",
    background: "#6200ea",
    color: "#fff",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    position: "fixed",
    left: isMobile ? (isSidebarOpen ? "0" : "-260px") : "0",
    top: 0,
    bottom: 0,
    overflowY: "auto",
    transition: "left 0.3s ease",
    zIndex: 2000,
  };

  const hamburgerStyle = {
    position: "fixed",
    top: 20,
    left: 20,
    background: "#6200ea",
    color: "#fff",
    border: "none",
    padding: "10px 12px",
    borderRadius: "5px",
    fontSize: "20px",
    cursor: "pointer",
    zIndex: 2500,
    display: isMobile ? "block" : "none",
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.5)",
    display: isMobile && isSidebarOpen ? "block" : "none",
    zIndex: 1500,
  };

  const contentStyle = {
    flex: 1,
    marginLeft: isMobile ? "0" : "250px",
    padding: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "margin-left 0.3s ease",
    background: "#ffffffff",
    minHeight: "80vh",
    minWidth:"70vw"
  };

  const menuBtn = (isActive) => ({
    display: "block",
    width: "100%",
    textAlign: "left",
    padding: "8px 12px",
    background: isActive ? "#fff" : "#3700b3",
    color: isActive ? "#000" : "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "8px",
    transition: "0.3s",
  });

  const allItems = projects.flatMap((p) => p.items);
  const active = allItems.find((p) => p.id === activeProject)?.Component;

  return (
    <>
      <div style={overlayStyle} onClick={toggleSidebar}></div>
      <button style={hamburgerStyle} onClick={toggleSidebar}>
        ☰
      </button>

      <aside style={sidebarStyle}>
        <h2 style={{ textAlign: "center" }}>📂 useReducer Projects</h2>
        {projects.map((group) => (
          <div key={group.category}>
            <div style={{ fontWeight: "bold", marginBottom: 10 }}>
              {group.category}
            </div>
            {group.items.map((item) => (
              <button
                key={item.id}
                style={menuBtn(activeProject === item.id)}
                onClick={() => {
                  setActiveProject(item.id);
                  if (isMobile) toggleSidebar();
                }}
              >
                {item.name}
              </button>
            ))}
          </div>
        ))}
      </aside>

      <main style={contentStyle}>{active}</main>
    </>
  );
}
