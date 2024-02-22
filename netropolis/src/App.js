import React, { useState, useEffect } from "react";
import "./App.css";
import { Route,Routes } from "react-router-dom";
import Login from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import QuestRegisterForm from "./pages/QuestRegisterForm";
import QuestRegisterPage from "./pages/QuestRegisterPage";
import PrivateRoutes from "./privateRoute/privateRoute";
import QuestDetailsPage from "./pages/QuestDetailsPage";

function App() {
	// usestate for setting a javascript
	// object for storing and using data
	const [loggedin,setLogin]= useState(false);
	
	return (
		<div className="App">
		<Routes>
			<Route path="/" element={<PrivateRoutes loggedin={loggedin}/> }> </Route>
			<Route path="/login" element={<Login setLogin={setLogin}></Login>}></Route>
			
			<Route path="/register" element={<Register setLogin={setLogin}></Register>}></Route>
			<Route path="/taskRegister" element={<QuestRegisterForm></QuestRegisterForm>}></Route>
			<Route path="/QuestDetailsPage/:questId" element={<QuestDetailsPage/>}></Route>			
		</Routes>
		
			
		</div>
	);
}

export default App;
