import "./App.css";
import Dashboard from "./screens/Dashboard";

function App() {
  // const addDocToFS = async () => {
  //   try {
  //     const docRef = await addDoc(collection(db, "users"), {
  //       first: "Ada",
  //       last: "Lovelace",
  //       born: 1815,
  //     });
  //     console.log("Document written with ID: ", docRef.id);
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }
  // };

  // addDocToFS();
  return <Dashboard />;
}

export default App;
