
// firebase configaration files for database

import Rebase from 're-base'
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const app = firebase.initializeApp({
    apiKey: "AIzaSyAaCVf0RRrQ1EVgjUXK4fkJOZr0VcVw1zs",
    authDomain: "catch-of-the-day-mahib.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-mahib.firebaseio.com"
});
const db = firebase.database(app);
const base = Rebase.createClass(db);

export default base;