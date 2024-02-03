import { useReducer, createContext, useContext } from 'react';
import { googleProvider, auth } from "../config/firebase";
import reducer from './reducer';
import { db, 
  // auth, storage 
} from "../config/firebase";
import {
  getDoc,
  getDocs,
  collection,
  query,
  where,
  setDoc,
  // addDoc,
  // deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import {
  // createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
// import { ref, uploadBytes } from "firebase/storage";
// import axios from 'axios';

import {
    LOAD_USER_BEGIN,
    LOAD_USER_SUCCESS,
    // LOAD_USER_ERROR,

    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    
    LOGOUT_USER_BEGIN,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_ERROR,
} from "./actions"

const user = localStorage.getItem('user');
const email = localStorage.getItem('email');
// const user_ = localStorage.getItem('user_');

const initialState = {
    email: email ? email: null,
    user: user ? JSON.parse(user) : null,
    showAlert: false,
    isLoading: false,
    alertText: 'abcd',
    alertType: 'danger',
};

const AppContext = createContext();

function useAppContext() {
    return useContext(AppContext);
};

function AppProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    function addUserToLocalStorage({ user, email }) {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('email', email);
    }

    function removeUserFromLocalStorage() {
      localStorage.removeItem('user');
      localStorage.removeItem('email');
    }

    const loginUser = async () => {
      dispatch({ type: LOGIN_USER_BEGIN });
      try {
        const userDetails = await signInWithPopup(auth, googleProvider);
        const email = userDetails["user"]["email"]

        let docRef = doc(db, "users", email);
        let docSnap = await getDoc(docRef);

        let user;
        if (docSnap.exists()) {
          user = docSnap.data();
        } else {
          user = await setDoc(doc(db, "users", email), { boards: [] });
          docSnap = await getDoc(docRef);
          user = docSnap.data();
        }
        dispatch({ type: LOGIN_USER_SUCCESS, payload: { user, email } });
        addUserToLocalStorage({ user, email })
      } catch (err) {
          // dispatch({ type: LOGIN_USER_ERROR });
          console.error(err);
      }
    }

    const logoutUser = async () => {
      dispatch({ type: LOGOUT_USER_BEGIN });
      try {
        await signOut(auth);
        dispatch({ type: LOGOUT_USER_SUCCESS });
        removeUserFromLocalStorage();
      } catch (err) {
        console.error(err);
        dispatch({ type: LOGOUT_USER_ERROR });
      }
    };
    
    const getUser = async () => {
      dispatch({ type: LOAD_USER_BEGIN });
      try {
        let docRef = doc(db, "users", email);
        let docSnap = await getDoc(docRef);
        let user = docSnap.data();
        addUserToLocalStorage({ user, email })
        dispatch({ type: LOAD_USER_SUCCESS, payload: { user } })

      } catch (err) {
        console.error(err);
      }
    };

    const addBoard = async ({ name, columns }) => {
        let docRef = doc(db, "users", email);
        try {
          await updateDoc(docRef, {
            boards: [...state.user["boards"], { name: name, columns: columns.map(x => ({"name": x, tasks: []})) } ]
            // userId: auth?.currentUser?.uid,
          });
          getUser();
        } catch (err) {
          console.error(err);
        }
    };
    
    const addTask = async ({ title, description, subtasks, status, board }) => {
        const selectedBoard = state.user["boards"].find(x => x.name === board);
        // selectedBoard["columns"].map(x => {if (x.name === status) {x.tasks.push({"title": title, "description": description, "subtasks": subtasks, "completedSubtasks": []})}} );
        selectedBoard["columns"].forEach(x => {if (x.name === status) {x.tasks.push({"title": title, "description": description, "subtasks": subtasks, "completedSubtasks": []})}} );
        let docRef = doc(db, "users", email);
        try {
          await updateDoc(docRef, {
            boards: [...state.user["boards"]]
            // userId: auth?.currentUser?.uid,
          });
          await getUser();
        } catch (err) {
          console.error(err);
        }
    };

    const editBoard = async ({ changedBoardColumns, newBoardName, oldBoardName }) => {
      const selectedBoard = state.user["boards"].find(x => x.name === oldBoardName);
      let newColumns = changedBoardColumns.filter(x => !selectedBoard["columns"].map(x=>x.name).includes(x));
      newColumns = newColumns.map(x => ({name: x, "tasks":[]}))
      newColumns = selectedBoard["columns"].filter(x => changedBoardColumns.includes(x.name)).concat(newColumns);
      selectedBoard["columns"] = newColumns;
      selectedBoard["name"] = newBoardName;
      let docRef = doc(db, "users", email);
      try {
        await updateDoc(docRef, {
          boards: [...state.user["boards"]]
          // userId: auth?.currentUser?.uid,
        });
        await getUser();
      } catch (err) {
        console.error(err);
      }
    };

    const addColumns = async ({ addedColumns, boardName }) => {
      const selectedBoard = state.user["boards"].find(x => x.name === boardName);
      const newColumns = addedColumns.map(x => ({name: x, "tasks":[]}))
      selectedBoard["columns"].push(...newColumns);
      let docRef = doc(db, "users", email);
      try {
        await updateDoc(docRef, {
          boards: [...state.user["boards"]]
          // userId: auth?.currentUser?.uid,
        });
        await getUser();
      } catch (err) {
        console.error(err);
      }
    }; 
    
    const deleteBoard = async ({ boardName }) => {
      state.user["boards"] = state.user["boards"].filter(x => x.name !== boardName);
      let docRef = doc(db, "users", email);
      try {
        await updateDoc(docRef, {
          boards: [...state.user["boards"]]
          // userId: auth?.currentUser?.uid,
        });
        await getUser();
      } catch (err) {
        console.error(err);
      }
    };
    
    const updateTask = async ({ completedSubtasks, currentStatus, title, boardName }) => {
      const selectedBoard = state.user["boards"].find(x => x.name === boardName);
      const initialStatus = selectedBoard["columns"].find(x => x["tasks"].find(y => y.title === title))["name"]
      console.log("initialStatus: ", initialStatus);

      let initialColumn = selectedBoard["columns"].find(x => x.name === initialStatus);
      const currentColumn = selectedBoard["columns"].find(x => x.name === currentStatus);
      const task = initialColumn["tasks"].find(x => x.title === title);
      initialColumn["tasks"] = initialColumn["tasks"].filter(x => x.title !== title)
      task["completedSubtasks"] = completedSubtasks;
      currentColumn["tasks"].push(task);
      console.log(task)
      
      let docRef = doc(db, "users", email);
      try {
        await updateDoc(docRef, {
          boards: [...state.user["boards"]]
          // userId: auth?.currentUser?.uid,
        });
        await getUser();
      } catch (err) {
        console.error(err);
      }
    };

    return (
        <AppContext.Provider
            value={{
                ...state,
                getUser,
                addBoard,
                addTask,
                editBoard,
                deleteBoard,
                updateTask,
                addColumns,
                loginUser,
                logoutUser,
            }}>
            {children}
        </AppContext.Provider>
      );
};

export { AppProvider, initialState, useAppContext };