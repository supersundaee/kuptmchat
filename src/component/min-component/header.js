import React, { Component } from "react";
import { Dropdown, Avatar, Text, Grid, User, Modal, Button, Switch, Spacer } from "@nextui-org/react";
import logokuptm from "../../assets/logokuptm.png";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalConfirmLogout: false,
            modalProfile: false
        }
    }

    openactionprofile = (key) => {
        if (key === 'logout') {
            this.setState({ modalConfirmLogout: true });
        } else if (key === 'profile') {
            this.setState({ modalProfile: true });
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="headerchat">
                    <div className="headeritem">
                        <img src={logokuptm} />
                        <div style={{ marginRight: '15px' }}>
                            <Text h3>
                                Chat
                            </Text>
                        </div>
                        <Dropdown placement="bottom-left">
                            <Dropdown.Trigger>
                                <Avatar
                                    size="md"
                                    color="secondary"
                                    bordered
                                    src={this.props.profile_picture}
                                />
                            </Dropdown.Trigger>
                            <Dropdown.Menu color="secondary" aria-label="Avatar Actions" onAction={(key) => { this.openactionprofile(key) }}>
                                <Dropdown.Item key="profile" css={{ height: "$18" }}>
                                    <Text b color="inherit" css={{ d: "flex" }}>
                                        Signed in as {this.props.fullName}
                                    </Text>
                                </Dropdown.Item>
                                <Dropdown.Item key="logout" color="error">
                                    Log Out
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
                <Modal
                    blur
                    closeButton
                    aria-labelledby="modal-title"
                    open={this.state.modalConfirmLogout}
                    onClose={() => { this.setState({ modalConfirmLogout: false }) }}
                >
                    <Modal.Header>
                        <Text id="modal-title" size={18}>
                            <Text b size={18}>
                                Confirm Logout?
                            </Text>
                        </Text>
                    </Modal.Header>
                    <Modal.Body>
                        <Text>Are you sure want to log out?</Text>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button auto flat color="error" onClick={() => { this.setState({ modalConfirmLogout: false }) }}>
                            No
                        </Button>
                        <Button auto onClick={this.props.logout}>
                            Log out
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal
                    blur
                    closeButton
                    aria-labelledby="modal-title"
                    open={this.state.modalProfile}
                    onClose={() => { this.setState({ modalProfile: false }) }}
                >
                    <Modal.Header>
                        <Text id="modal-title" size={18}>
                            <Text b size={18}>
                                My Profile
                            </Text>
                        </Text>
                    </Modal.Header>
                    <Modal.Body>
                        <div style={{ margin: '0 auto' }}>
                            <Avatar
                                size="xl"
                                color="primary"
                                bordered
                                src={this.props.profile_picture}
                            />
                        </div>
                        <Text h3 style={{ textAlign: 'center' }}>{this.props.fullName}</Text>
                        <Text size={16} style={{ textAlign: 'center' }}>
                            Signed in with Google
                        </Text>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button auto flat color="error" onClick={() => { this.setState({ modalProfile: false }) }}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        )
    }
}

export default Header;