import React, { Component } from "react";
import { auth, database } from "firebase";
import { Button, Spacer, Text, Modal, Container, Progress } from "@nextui-org/react";
import { User } from "react-iconly";
import "../style/style.css";
import logo from "../assets/logokuptm.png";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      errorMessage: "",
      modalLoginFailed: false,
      loginloader: false
    }
  }
  loginWithGmail = () => {
    this.setState({loginloader: true});
    //e.preventDefault();
    let provider = new auth.GoogleAuthProvider();
    auth()
      .signInWithPopup(provider)
      .then(result => {
        this.setState({loginloader: false});
        let additionalUserInfo = result.additionalUserInfo;
        let user = {
          userName: result.additionalUserInfo.profile.given_name,
          profile_picture: result.user.photoURL,
          fullName: result.user.displayName,
          email: result.user.email,
          uid: result.user.uid
        }
        if (additionalUserInfo.isNewUser) {
          this.addUserList(result);
          this.props.isLogin(user);
        } else {
          let userRef = database().ref().child("usersTable").child(result.user.uid);
          userRef.once("value", snapshot => {
            var isAvailable = snapshot.val();
            if (!isAvailable) {
              this.addUserList(result);
            } else {
              userRef.update({ profile_picture: result.user.photoURL, uid: result.user.uid });
            }
          });
          this.props.isLogin(user);
        }
      })
      .catch(error => {
        var errorMessage = error.message;
        this.setState({ error: true, errorMessage, modalLoginFailed: true, loginloader: false });
      });
  };

  addUserList = result => {
    database()
      .ref()
      .child("usersTable")
      .child(result.user.uid)
      .set({
        userName: result.additionalUserInfo.profile.given_name,
        profile_picture: result.user.photoURL,
        fullName: result.user.displayName,
        email: result.user.email,
        uid: result.user.uid
      });
  };

  render() {
    return (
      <div>
        <div className="loginform">
          <img src={logo} alt="Logo KUPTM" />
          <Text h3 style={{textAlign: 'center'}}>KUPTM Chat</Text>
          <Progress style={this.state.loginloader === true ? {display: 'block'} : {display: 'none'}} indeterminated value={50} shadow color="primary" status="secondary" />
          <Spacer x={1}/>
          <Button
            onPress={this.loginWithGmail}
            icon={<User set="bold" />}
          >
            <Spacer y={1} />
            Login with Google
          </Button>
        </div>
        <Modal
          closeButton
          aria-labelledby="modal-title"
          open={this.state.modalLoginFailed}
          onClose={() => { this.setState({ modalLoginFailed: false }) }}
        >
          <Modal.Header>
            <Text id="modal-title" size={18}>
              Sign in failed
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Text>{this.state.errorMessage}</Text>
          </Modal.Body>
          <Modal.Footer>
            <Button auto flat color="error" onClick={() => { this.setState({ modalLoginFailed: false }) }}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default Login;
