import React, { Component } from 'react';
import { observer } from 'mobx-react';
import AppStore from '../stores/AppStore';
import styled from 'styled-components';
import '../css/AppBar.css';

class AppBar extends Component {
	constructor(props) {
		super(props);
	}
	handleReload = () => {
		window.location.reload(true);
	}
	handleLogout = ()=>{
		window.location.assign('https://staff.kfsyscc.org/logout');
	}

	render() {
		return (
			<header className="Bar container">
				<span className="logo" onClick={this.handleReload}>入口網站</span>
				<span className="User">
					<span style={{ display: 'flex', flexWrap: 'wrap', width: '60px' }}>
						<span style={{ fontSize: '12px', color: '#AC95FF', width: '100%' }}>
							{AppStore.userInfo.USER_ID}
						</span>
						<span style={{ fontSize: '15px', width: '100%' }}>
							{AppStore.userInfo.NAME_CH}
						</span>
					</span>
					<div>
						<div className="dropdownContent">
							<a onClick={this.handleLogout}>登出</a>
						</div>
					</div>
				</span>
			</header>
		);
	}
}

export default observer(AppBar);
