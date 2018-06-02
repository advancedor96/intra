import React, { Component } from 'react';
import { observer } from 'mobx-react';
import AppStore from '../stores/AppStore';
import styled from 'styled-components';
import '../css/AppBar.css';
import Logo from '../images/portalLogo.png';
import swal from 'sweetalert';
class AppBar extends Component {
	constructor(props) {
		super(props);
	}
	handleReload = () => {
		window.location.reload(true);
	}
	handleLogout = ()=>{
		swal("將跳轉新網址", "https://staff.kfsyscc.org/logout");
		// window.location.assign('https://staff.kfsyscc.org/logout');
	}

	render() {
		return (
			<header className="Bar container" style={{marginTop: '5px', marginBottom: '10px'}}>
				<a className="logo" onClick={this.handleReload}><img src={Logo} alt="logo" style={{height: '100%', maxHeight: '64px'}}/></a>
				<span className="User">
					<span style={{ display: 'flex', flexWrap: 'wrap', width: '60px' }}>
						<span style={{ fontSize: '15px', width: '100%' }}>
							{AppStore.userInfo.NAME_CH}
						</span>
						<span style={{ fontSize: '12px', width: '100%' }}>
							{AppStore.userInfo.USER_ID}
						</span>
					</span>
					<div className="logout">
						<a onClick={this.handleLogout}>登出</a>
					</div>
				</span>
			</header>
		);
	}
}

export default observer(AppBar);
