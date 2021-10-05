import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';
import * as profileActions from 'store/modules/profile';
import ProfileUpdateModal from 'components/modal/ProfileUpdateModal';

class ProfileUpdateModalContainer extends Component {
  getProfile = () => {
    const { ProfileActions, userId: id } = this.props;
    ProfileActions.getProfile(id);
  }

  handleCancel = () => {
    const { BaseActions } = this.props;
    BaseActions.hideModal('profileCardUpdate');
  }

  handleSubmit = async ({
    // nick,
    introduction
  }) => {
    const { userId: id } = this.props;
    const { ProfileActions, BaseActions } = this.props;
    await ProfileActions.updateProfileCard(
      id,
      // nick,
      introduction
    );
    BaseActions.hideModal('profileCardUpdate');
    this.getProfile();
  }
  
  render() {
    const { handleCancel, handleSubmit } = this;
    const { visible, error } = this.props;
    return (
      <ProfileUpdateModal
        visible={visible}
        error={error}
        onCancel={handleCancel}
        onSubmit={handleSubmit}/>
    );
  }
}

export default connect(
  (state) => ({
    visible: state.base.getIn(['modal', 'profileCardUpdate']),
    error: state.profile.getIn(['error', 'profileCardUpdate'])
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    ProfileActions: bindActionCreators(profileActions, dispatch)
  })
)(ProfileUpdateModalContainer);