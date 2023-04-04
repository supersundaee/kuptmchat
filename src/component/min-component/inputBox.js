import React, { Component } from "react";
import { Input, styled } from "@nextui-org/react";
import { emojis } from "./emoji";
import { database } from "firebase";
import { ChevronUpCircle } from "react-iconly";

const SendButton = styled('button', {
    // reset button styles
    color: 'White',
    background: 'transparent',
    border: 'none',
    padding: 0,
    margin: 0,
    // styles
    width: '24px',
    margin: '0 10px',
    dflex: 'center',
    bg: '$primary',
    borderRadius: '$rounded',
    cursor: 'pointer',
    transition: 'opacity 0.25s ease 0s, transform 0.25s ease 0s',
    svg: {
        size: '100%',
        padding: '4px',
        transition: 'transform 0.25s ease 0s, opacity 200ms ease-in-out 50ms',
        boxShadow: '0 5px 20px -5px rgba(0, 0, 0, 0.1)',
    },
    '&:hover': {
        opacity: 0.8
    },
    '&:active': {
        transform: 'scale(0.9)',
        svg: {
            transform: 'translate(24px, -24px)',
            opacity: 0
        }
    }
});

const SendIcon = ({
    fill = "currentColor",
    filled,
    size,
    height,
    width,
    label,
    className,
    ...props
}) => {
    return (
        <svg
            data-name="Iconly/Curved/Lock"
            xmlns="http://www.w3.org/2000/svg"
            width={size || width || 24}
            height={size || height || 24}
            viewBox="0 0 24 24"
            className={className}
            {...props}
        >
            <g transform="translate(2 2)">
                <path
                    d="M19.435.582A1.933,1.933,0,0,0,17.5.079L1.408,4.76A1.919,1.919,0,0,0,.024,6.281a2.253,2.253,0,0,0,1,2.1L6.06,11.477a1.3,1.3,0,0,0,1.61-.193l5.763-5.8a.734.734,0,0,1,1.06,0,.763.763,0,0,1,0,1.067l-5.773,5.8a1.324,1.324,0,0,0-.193,1.619L11.6,19.054A1.91,1.91,0,0,0,13.263,20a2.078,2.078,0,0,0,.25-.01A1.95,1.95,0,0,0,15.144,18.6L19.916,2.525a1.964,1.964,0,0,0-.48-1.943"
                    fill={fill}
                />
            </g>
        </svg>
    );
};

class InputBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emoji: emojis,
            showEmoji: false,
            text: ""
        }
    }
    emojiToggle = () => {
        this.setState({ showEmoji: !this.state.showEmoji })
    }
    selectEmoji = (emo) => {
        let prevText = this.state.text;
        this.setState({ text: prevText + emo })
    }
    sendMessage = (event) => {
        event.preventDefault();
        if (this.state.text.trim() !== "") {
            database().ref(this.props.roomName).push().set({
                uid: this.props.userId,
                time: Date.now(),
                name: this.props.userName,
                text: this.state.text
            });
            this.setState({ text: "" })
        }
    }
    render() {
        return (
            <React.Fragment>
                <div className="messageinputbox">
                    <form onSubmit={this.sendMessage} style={{ height: "100%", width: "100%" }}>
                        <Input
                            aria-label="inputmsgbox"
                            width="100%"
                            size="lg"
                            bordered
                            clearable
                            contentRightStyling={false}
                            value={this.state.text}
                            placeholder="Type your message..."
                            onChange={(text) => { this.setState({ text: text.target.value }) }}
                        />
                    </form>
                    <div>
                        <div className="sendingbtngroup" aria-label="sendopt">
                            <SendButton aria-label="emojibtn" onClick={this.emojiToggle}>
                                <ChevronUpCircle primaryColor="white" set="bold" />
                            </SendButton>
                            <SendButton aria-label="sendmsg" onClick={this.sendMessage}>
                                <SendIcon />
                            </SendButton>
                        </div>
                    </div>
                </div>
                <div
                    className="emojicontainer"
                    style={{ display: this.state.showEmoji ? "block" : "none" }}
                >
                    <div className="emojidisplay">
                        {this.state.emoji.map((emo, i) =>
                            <div
                                key={i}
                                cursor="pointer"
                                onClick={() => this.selectEmoji(emo)}
                            >{emo}</div>
                        )}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default InputBox;