import React, { Component } from "react";
import ReactDOM from 'react-dom';
import moment from 'moment'
import { Text, Loading } from "@nextui-org/react";
import InputBox from "./inputBox";
import "../../style/style.css";

class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }
    //Scroll message UI-kit
    scrollToBottom = () => {
        const messagesContainer = ReactDOM.findDOMNode(this.messagesContainer);
        messagesContainer.scroll(0, messagesContainer.scrollHeight);
    }

    render() {
        return (
            <div className="chats">
                <div className="messagesection">
                    <div className="innermessage">
                        <div className="innermessage2" ref={(el) => { this.messagesContainer = el; }}>
                            {
                                !this.props.loadingData
                                    ?
                                    this.props.messages.sort((a, b) => new Date(a.time) - new Date(b.time)).map((conversation, i) => (
                                        conversation.uid === this.props.userId
                                            ?
                                            <div className="eachmessage" key={i} style={{ flexDirection: 'row-reverse' }}>
                                                {this.props.usersList.map((user, i) =>
                                                    (user.uid === conversation.uid)
                                                        ?
                                                        <img
                                                            className="avatarprofile"
                                                            key={i}
                                                            src={user.img}
                                                        />
                                                        :
                                                        ''
                                                )}
                                                <div className="messagecontainer">
                                                    <div>
                                                        <div>
                                                            <Text>{conversation.msg}</Text>
                                                            <Text className="chatname">
                                                                - {conversation.name} • {moment(conversation.time).fromNow()}
                                                            </Text>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            <div className="eachmessage" key={i}>
                                                {this.props.usersList.map((user, i) =>
                                                    (user.uid === conversation.uid)
                                                        ?
                                                        <img
                                                            className="avatarprofile"
                                                            key={i}
                                                            src={user.img}
                                                            style={{ marginRight: '0.25em' }}
                                                        />
                                                        :
                                                        ''
                                                )}
                                                <div className="messagecontainer2">
                                                    <div>
                                                        <div>
                                                            <Text>
                                                                {conversation.msg}
                                                            </Text>
                                                            <Text className="chatname">
                                                                - {conversation.name} • {moment(conversation.time).fromNow()}
                                                            </Text>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                    ))
                                    :
                                    <div>
                                        <Loading color="primary"></Loading>
                                    </div>
                            }
                        </div>
                        {!this.props.loadingData
                            ? <InputBox
                                userName={this.props.userName}
                                userId={this.props.userId}
                                roomName={this.props.roomName}
                            />
                            : ""
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Message;