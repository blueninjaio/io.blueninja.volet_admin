import React, { Component } from 'react'

export default class index extends Component {

    viewVoucher = () => {
        this.props.history.push("/viewvoucher")
    }
    render() {
        return (
            <div className="dashboard-container">
                <h3 className="page-title">Vouchers</h3>
                <button type="button" className="btn btn-primary add-voucher-btn" data-toggle="modal" data-target="#exampleModal">
                      <img src="https://png.pngtree.com/svg/20161118/6fc980719c.svg"/>
                </button>
                {/* Modal */}
                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                ...
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                            </div>
                        </div>
                </div>
                <div className="container-fluid">
                    <div className="voucher-container">
                        <div className="voucher-img">
                            <img src="https://i.kinja-img.com/gawker-media/image/upload/s--vHt6tbFa--/c_scale,f_auto,fl_progressive,q_80,w_800/xjmx1csashjww8j8jwyh.jpg"/>
                        </div>
                        <div className="voucher-desc">
                            <span>Title</span>
                            <span>Description</span>
                            <span>Validity</span>
                            <span>Quantity</span>
                            
                           
                        </div>
                        <div className="voucher-btn-container">
                                <button className="send-voucher-btn" onClick={()=> this.viewVoucher()}>View</button>
                                <button className="send-voucher-btn">Send</button>
                        </div>
                    </div>
                    <div className="voucher-container">
                        <div className="voucher-img">
                            <img src="https://www.rd.com/wp-content/uploads/2018/04/9-Foods-You-Should-Never-Eat-Before-Bed-760x506.jpg"/>
                        </div>
                        <div className="voucher-desc">
                            <span>Title</span>
                            <span>Description</span>
                            <span>Validity</span>
                            <span>Quantity</span>
                        </div>
                        <div className="voucher-btn-container">
                                <button className="send-voucher-btn" onClick={()=> this.viewVoucher()}>View</button>
                                <button className="send-voucher-btn">Send</button>
                        </div>
                    </div>
                    <div className="voucher-container">
                        <div className="voucher-img">
                            <img src="https://amp.insider.com/images/5ad792ffbd967146008b45d9-750-562.jpg"/>
                        </div>
                        <div className="voucher-desc">
                            <span>Title</span>
                            <span>Description</span>
                            <span>Validity</span>
                            <span>Quantity</span>
                            
                        </div>
                        <div className="voucher-btn-container">
                                <button className="send-voucher-btn" onClick={()=> this.viewVoucher()}>View</button>
                                <button className="send-voucher-btn">Send</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
