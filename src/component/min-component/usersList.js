import React, { Component } from 'react';
import { Loading, Text, Card, Spacer } from '@nextui-org/react';
import "../../style/style.css";
import publicgroupbg from '../../assets/publicgroupbg.png';

class UsersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: "",
            activeItem: "chatRoom"
        }
    }

    selectUser = (user) => {
        // console.log(user)
        if (this.props.loadingData) { return }
        if (user === "chatRoom") {
            this.props.getMessageFromRoom(user)
            this.setState({ activeItem: user });
        } else {
            this.props.selectUser(user)
            this.setState({ activeItem: user.uid })
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="userlistouter">
                    <div className="userlistinner">
                        {!this.props.usersList.length > 0
                            ?
                            <div>
                                <Loading color="primary"></Loading>
                            </div>
                            :
                            <React.Fragment>
                                <Card variant='flat' isPressable isHoverable onClick={() => this.selectUser("chatRoom")}>
                                    <Card.Image
                                        src={publicgroupbg}
                                        objectFit="cover"
                                        width="100%"
                                        height={60}
                                        alt="Card image background"
                                    />
                                    <Text h5 style={{ position: 'absolute', color: 'white', padding: '15px' }}>Public Groups</Text>
                                </Card>
                                <Spacer y={0.5} />
                                {this.props.usersList.map(user => {
                                    return (user.uid !== this.props.userId)
                                        ?
                                        <Card variant='flat' isPressable isHoverable key={user.uid} onClick={() => this.selectUser(user)}>
                                            <Card.Image
                                                src={user.img}
                                                objectFit="cover"
                                                width="100%"
                                                height={60}
                                                alt="Card image background"
                                            />
                                            <Text h5 style={{ position: 'absolute', color: 'white', padding: '10px', zIndex: 2, }}>{user.name}</Text>
                                        </Card>
                                        : ""
                                })}
                            </React.Fragment>
                        }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default UsersList;