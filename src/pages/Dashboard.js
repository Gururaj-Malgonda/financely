import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Cards from "../components/Cards/Cards";
import AddExpenseModal from "../components/Modals/AddExpenseModal";
import AddIncomeModal from "../components/Modals/AddIncomeModal";
import moment from "moment";
import { collection, addDoc, query, getDocs } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { db, auth } from "../firebase";

function Dashboard() {
  const [user] = useAuthState(auth);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [transaction, setTransaction] = useState([]);
  const [loading, setLoading] = useState(false);

  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };
  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };
  const handleExpenseModal = () => {
    setIsExpenseModalVisible(false);
  };
  const handleIncomeModal = () => {
    setIsIncomeModalVisible(false);
  };

  const onFinish = (values, type) => {
    console.log("On Finish", values, type);
    const newTransaction = {
      type: type,
      date: moment(values.date).format("YYYY-MM-DD"),
      amount: values.amount,
      name: values.name,
    };
    addTransaction(newTransaction);
  };

  async function addTransaction(transaction) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log("Document written with ID: ", docRef.id);
      toast.success("Transaction added!");
    } catch (e) {
      console.log("Error adding document: ", e);
      toast.error("Couldn't add transaction!");
    }
  }

  useEffect(() => {
    // Get all Docs from a collection
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      const transactionsArray = [];
      querySnapshot.forEach((doc) => {
        // doc.data is never undefined for query doc snapshot
        transactionsArray.push(doc.data());
      });
      setTransaction(transactionsArray);
      console.log(transactionsArray);
      toast.success("Transaction fetched");
    }
    setLoading(false);
  }

  return (
    <div>
      <Header />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Cards
            showExpenseModal={showExpenseModal}
            showIncomeModal={showIncomeModal}
          />
          <AddExpenseModal
            isExpenseModalVisible={isExpenseModalVisible}
            handleExpenseModal={handleExpenseModal}
            onFinish={onFinish}
          />
          <AddIncomeModal
            isIncomeModalVisible={isIncomeModalVisible}
            handleIncomeModal={handleIncomeModal}
            onFinish={onFinish}
          />
        </>
      )}
    </div>
  );
}

export default Dashboard;
