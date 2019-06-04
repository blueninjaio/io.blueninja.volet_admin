import React, { Component } from 'react'


export class index extends Component {
    constructor ( props ) {
        super( props );
		
		this.state = {
            isChecked: false,
            filterUsers: 'all'
		}
    }

    viewAgent = () => {
        this.props.history.push('/viewagent')
    }
    
    toggle = async () => {
        await this.setState( { isChecked: !this.state.isChecked } );
        console.log(this.state.isChecked)
        if (!this.state.isChecked){
            console.log("Users Page")
        }
        else if (this.state.isChecked){
            this.props.history.push("/users")
        }
    }
    
    filterPage = async (event) => {
        await this.setState({filterUsers: event.target.value})
        console.log(this.state.filterUsers)
    }


    render() {
        return (
        <div className="dashboard-container">
            
            <h3 className="page-title">User Agents</h3>
            <select className="form-control filter-pages" value={this.state.filterUsers} onChange={ this.filterPage}>
                <option value="all">All</option>
                <option value="email">Email</option>
                <option value="gmail">Gmail</option>
                <option value="fb">Facebook</option>
                
            </select>
            <div className="user-toggle">
                <span className="user-toggle-text">Users</span>
                <div className="switch-container">
                    <label>
                        <input ref="switch" onClick={()=> this.toggle()} className="user-agent" type="checkbox" />
                        <div>
                
                            <div></div>
                        </div>
                    </label>
                </div>
                <span>Agents</span>
            </div>

            <div className="container-fluid">
                {/* All Users */}
                {
                    this.state.filterUsers === "all"
                    ?
                <div className="profile-card-container">
                        <div className="profile-card">
                            <div className="card-header">
                                <strong>User Agent</strong>
                            </div>
                            <div className="card-body">
                                <div className="card-body-content">
                                    <img src="https://e-ga.com.au/cms/wp-content/uploads/2014/03/josh-profile-img1.jpg"/>
                                    <span>Sarah Rock</span>
                                    <span><img src="http://www.stickpng.com/assets/images/584856bce0bb315b0f7675ad.png" className="email-icon"/>test@gmail.com</span>
                                    <span>+6012-3456789</span>
                                    <span>Volet Credits: 100</span>
                                    <span>Registered on: 19th June 2019</span>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button className="profile-view-btn" onClick={()=> this.viewAgent()}>View</button>
                                <button className="profile-delete-btn">Delete</button>
                            </div>
                        </div>
                        <div className="profile-card">
                            <div className="card-header">
                                <strong>User Agent</strong>
                            </div>
                            <div className="card-body">
                                <div className="card-body-content">
                                    <img src="https://e-ga.com.au/cms/wp-content/uploads/2014/03/josh-profile-img1.jpg"/>
                                    <span>Sarah Rock</span>
                                    <span><img src="https://img.icons8.com/color/420/gmail.png" className="email-icon"/>test@gmail.com</span>
                                    <span>+6012-3456789</span>
                                    <span>Volet Credits: 100</span>
                                    <span>Registered on: 19th June 2019</span>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button className="profile-view-btn" onClick={()=> this.viewAgent()}>View</button>
                                <button className="profile-delete-btn">Delete</button>
                            </div>
                        </div>
                        <div className="profile-card">
                            <div className="card-header">
                                <strong>User Agent</strong>
                            </div>
                            <div className="card-body">
                                <div className="card-body-content">
                                    <img src="https://e-ga.com.au/cms/wp-content/uploads/2014/03/josh-profile-img1.jpg"/>
                                    <span>Sarah Rock</span>
                                    <span><img src="https://png.pngtree.com/svg/20170602/96bf30659c.png" className="email-icon"/>test@gmail.com</span>
                                    <span>+6012-3456789</span>
                                    <span>Volet Credits: 100</span>
                                    <span>Registered on: 19th June 2019</span>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button className="profile-view-btn" onClick={()=> this.viewAgent()}>View</button>
                                <button className="profile-delete-btn">Delete</button>
                            </div>
                        </div>
                </div>
                :
                null
                }

                 {/* FB Users */}

                 {
                     this.state.filterUsers === "fb"
                     ?
                 <div className="profile-card-container">
                        <div className="profile-card">
                            <div className="card-header">
                                <strong>User Agent</strong>
                            </div>
                            <div className="card-body">
                                <div className="card-body-content">
                                    <img src="https://e-ga.com.au/cms/wp-content/uploads/2014/03/josh-profile-img1.jpg"/>
                                    <span>Sarah Rock</span>
                                    <span><img src="https://png.pngtree.com/svg/20170602/96bf30659c.png" className="email-icon"/>test@gmail.com</span>
                                    <span>+6012-3456789</span>
                                    <span>Volet Credits: 100</span>
                                    <span>Registered on: 19th June 2019</span>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button className="profile-view-btn" onClick={()=> this.viewAgent()}>View</button>
                                <button className="profile-delete-btn">Delete</button>
                            </div>
                        </div>
                        <div className="profile-card">
                            <div className="card-header">
                                <strong>User Agent</strong>
                            </div>
                            <div className="card-body">
                                <div className="card-body-content">
                                    <img src="https://e-ga.com.au/cms/wp-content/uploads/2014/03/josh-profile-img1.jpg"/>
                                    <span>Sarah Rock</span>
                                    <span><img src="https://png.pngtree.com/svg/20170602/96bf30659c.png" className="email-icon"/>test@gmail.com</span>
                                    <span>+6012-3456789</span>
                                    <span>Volet Credits: 100</span>
                                    <span>Registered on: 19th June 2019</span>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button className="profile-view-btn" onClick={()=> this.viewAgent()}>View</button>
                                <button className="profile-delete-btn">Delete</button>
                            </div>
                        </div>
                        <div className="profile-card">
                            <div className="card-header">
                                <strong>User Agent</strong>
                            </div>
                            <div className="card-body">
                                <div className="card-body-content">
                                    <img src="https://e-ga.com.au/cms/wp-content/uploads/2014/03/josh-profile-img1.jpg"/>
                                    <span>Sarah Rock</span>
                                    <span><img src="https://png.pngtree.com/svg/20170602/96bf30659c.png" className="email-icon"/>test@gmail.com</span>
                                    <span>+6012-3456789</span>
                                    <span>Volet Credits: 100</span>
                                    <span>Registered on: 19th June 2019</span>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button className="profile-view-btn" onClick={()=> this.viewAgent()}>View</button>
                                <button className="profile-delete-btn">Delete</button>
                            </div>
                        </div>
                </div>
                :
                null
                 }


                
                 {/* Email */}
                 {
                     this.state.filterUsers === "email"
                     ?
                 <div className="profile-card-container">
                        <div className="profile-card">
                            <div className="card-header">
                                <strong>User Agent</strong>
                            </div>
                            <div className="card-body">
                                <div className="card-body-content">
                                    <img src="https://e-ga.com.au/cms/wp-content/uploads/2014/03/josh-profile-img1.jpg"/>
                                    <span>Sarah Rock</span>
                                    <span><img src="http://www.stickpng.com/assets/images/584856bce0bb315b0f7675ad.png" className="email-icon"/>test@gmail.com</span>
                                    <span>+6012-3456789</span>
                                    <span>Volet Credits: 100</span>
                                    <span>Registered on: 19th June 2019</span>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button className="profile-view-btn" onClick={()=> this.viewAgent()}>View</button>
                                <button className="profile-delete-btn">Delete</button>
                            </div>
                        </div>
                        <div className="profile-card">
                            <div className="card-header">
                                <strong>User Agent</strong>
                            </div>
                            <div className="card-body">
                                <div className="card-body-content">
                                    <img src="https://e-ga.com.au/cms/wp-content/uploads/2014/03/josh-profile-img1.jpg"/>
                                    <span>Sarah Rock</span>
                                    <span><img src="http://www.stickpng.com/assets/images/584856bce0bb315b0f7675ad.png" className="email-icon"/>test@gmail.com</span>
                                    <span>+6012-3456789</span>
                                    <span>Volet Credits: 100</span>
                                    <span>Registered on: 19th June 2019</span>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button className="profile-view-btn" onClick={()=> this.viewAgent()}>View</button>
                                <button className="profile-delete-btn">Delete</button>
                            </div>
                        </div>
                        <div className="profile-card">
                            <div className="card-header">
                                <strong>User Agent</strong>
                            </div>
                            <div className="card-body">
                                <div className="card-body-content">
                                    <img src="https://e-ga.com.au/cms/wp-content/uploads/2014/03/josh-profile-img1.jpg"/>
                                    <span>Sarah Rock</span>
                                    <span><img src="http://www.stickpng.com/assets/images/584856bce0bb315b0f7675ad.png" className="email-icon"/>test@gmail.com</span>
                                    <span>+6012-3456789</span>
                                    <span>Volet Credits: 100</span>
                                    <span>Registered on: 19th June 2019</span>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button className="profile-view-btn" onClick={()=> this.viewAgent()}>View</button>
                                <button className="profile-delete-btn">Delete</button>
                            </div>
                        </div>
                </div>
                :
                null
                 }

                 {/* Gmail Users */}
                 {
                     this.state.filterUsers === "gmail"
                     ?
                <div className="profile-card-container">
                    <div className="profile-card">
                            <div className="card-header">
                                <strong>User Agent</strong>
                            </div>
                            <div className="card-body">
                                <div className="card-body-content">
                                    <img src="https://e-ga.com.au/cms/wp-content/uploads/2014/03/josh-profile-img1.jpg"/>
                                    <span>Sarah Rock</span>
                                    <span><img src="https://img.icons8.com/color/420/gmail.png" className="email-icon"/>test@gmail.com</span>
                                    <span>+6012-3456789</span>
                                    <span>Volet Credits: 100</span>
                                    <span>Registered on: 19th June 2019</span>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button className="profile-view-btn" onClick={()=> this.viewAgent()}>View</button>
                                <button className="profile-delete-btn">Delete</button>
                            </div>
                        </div>
                        <div className="profile-card">
                            <div className="card-header">
                                <strong>User Agent</strong>
                            </div>
                            <div className="card-body">
                                <div className="card-body-content">
                                    <img src="https://e-ga.com.au/cms/wp-content/uploads/2014/03/josh-profile-img1.jpg"/>
                                    <span>Sarah Rock</span>
                                    <span><img src="https://img.icons8.com/color/420/gmail.png" className="email-icon"/>test@gmail.com</span>
                                    <span>+6012-3456789</span>
                                    <span>Volet Credits: 100</span>
                                    <span>Registered on: 19th June 2019</span>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button className="profile-view-btn" onClick={()=> this.viewAgent()}>View</button>
                                <button className="profile-delete-btn">Delete</button>
                            </div>
                        </div>
                        <div className="profile-card">
                            <div className="card-header">
                                <strong>User Agent</strong>
                            </div>
                            <div className="card-body">
                                <div className="card-body-content">
                                    <img src="https://e-ga.com.au/cms/wp-content/uploads/2014/03/josh-profile-img1.jpg"/>
                                    <span>Sarah Rock</span>
                                    <span><img src="https://img.icons8.com/color/420/gmail.png" className="email-icon"/>test@gmail.com</span>
                                    <span>+6012-3456789</span>
                                    <span>Volet Credits: 100</span>
                                    <span>Registered on: 19th June 2019</span>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button className="profile-view-btn" onClick={()=> this.viewAgent()}>View</button>
                                <button className="profile-delete-btn">Delete</button>
                            </div>
                        </div>
                </div>
                     :
                     null
                 }
                
                

            </div>
        </div>
        )
    }
}

export default index
