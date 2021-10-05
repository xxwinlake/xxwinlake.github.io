import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'lib/api';

/* action types */
const GET_PROFILE = 'profile/GET_PROFILE';
const UPDATE_PROFILE_CARD = 'profile/UPDATE_PROFILE_CARD';

// const GET_USER_CONTENT_LIST = 'profile/GET_USER_CONTENT_LIST';
const GET_USER_DIAGNOSIS_LIST = 'profile/GET_USER_DIAGNOSIS_LIST';
const GET_USER_MEDICINE_LIST = 'profile/GET_USER_MEDICINE_LIST';
const GET_USER_SYMPTOM_LIST = 'profile/GET_USER_SYMPTOM_LIST';

const UPDATE_CONTENT_ID = 'profile/UPDATE_CONTENT_ID';
const POST_USER_DIAGNOSIS = 'profile/POST_USER_DIAGNOSIS';
const POST_USER_SYMPTOM = 'profile/POST_USER_SYMPTOM';
const POST_USER_MEDICINE = 'profile/POST_USER_MEDICINE';
const POST_USER_MEDICINE_DOSAGE = 'profile/POST_USER_MEDICINE_DOSAGE';
const POST_USER_MEDICINE_PURPOSE = 'profile/POST_USER_MEDICINE_PURPOSE';
const POST_USER_MEDICINE_EVALUATION = 'profile/POST_USER_MEDICINE_EVALUATION';

/* action creators */
export const getProfile = createAction(GET_PROFILE, api.getProfile);
export const updateProfileCard = createAction(UPDATE_PROFILE_CARD, api.updateProfileCard);

// export const getUserContentList = createAction(GET_USER_CONTENT_LIST, api.getUserContentList);
export const getUserDiagnosisList = createAction(GET_USER_DIAGNOSIS_LIST, api.getUserDiagnosisList);
export const getUserMedicineList = createAction(GET_USER_MEDICINE_LIST, api.getUserMedicineList);
export const getUserSymptomList = createAction(GET_USER_SYMPTOM_LIST, api.getUserSymptomList);

export const updateContentId = createAction(UPDATE_CONTENT_ID);
export const postUserDiagnosis = createAction(POST_USER_DIAGNOSIS, api.postUserDiagnosis);
export const postUserSymptom = createAction(POST_USER_SYMPTOM, api.postUserSymptom);
export const postUserMedicine = createAction(POST_USER_MEDICINE, api.postUserMedicine);
export const postUserMedicineDosage = createAction(POST_USER_MEDICINE_DOSAGE, api.postUserMedicineDosage);
export const postUserMedicinePurpose = createAction(POST_USER_MEDICINE_PURPOSE, api.postUserMedicinePurpose);
export const postUserMedicineEvaluation = createAction(POST_USER_MEDICINE_EVALUATION, api.postUserMedicineEvaluation);

/* initial state */
const initialState = Map({
  profile: Map(),
  // contents: List(),
  diagnosisList: List(),
  medicineList: List(),
  symptomList: List(),
  contentId: '',
  error: Map({
    profileCardUpdate: null,
    userDiagnosisCreate: null,
    userSymptomCreate: null,
    userMedicineCreate: null,
    userMedicineDosageCreate: null,
    userMedicinePurposeCreate: null,
    userMedicineEvaluationCreate: null
  })
});

/* reducer */
export default handleActions({
  ...pender({
    type: GET_PROFILE,
    onSuccess: (state, action) => {
      const { profile } = action.payload.data;
      return state.set('profile', fromJS(profile));
    }
  }),
  ...pender({
    type: UPDATE_PROFILE_CARD,
    onSuccess: (state, action) => {
      return state.setIn(['error', 'profileCardUpdate'], null);
    },
    onError: (state, action) => {
      return state.setIn(['error', 'profileCardUpdate'], action.payload.response.data.message);
    }
  }),
  ...pender({
    type: GET_USER_DIAGNOSIS_LIST,
    onSuccess: (state, action) => {
      const { contents } = action.payload.data;
      return state.set('diagnosisList', fromJS(contents));
    }
  }),
  ...pender({
    type: GET_USER_MEDICINE_LIST,
    onSuccess: (state, action) => {
      const { contents } = action.payload.data;
      return state.set('medicineList', fromJS(contents));
    }
  }),
  ...pender({
    type: GET_USER_SYMPTOM_LIST,
    onSuccess: (state, action) => {
      const { contents } = action.payload.data;
      return state.set('symptomList', fromJS(contents));
    }
  }),
  [UPDATE_CONTENT_ID]: (state, action) => {
    const { payload: contentId } = action;
    return state.set('contentId', contentId);
  },
  ...pender({
    type: POST_USER_DIAGNOSIS,
    onSuccess: (state, action) => {
      return state.setIn(['error', 'userDiagnosisCreate'], null);
    },
    onError: (state, action) => {
      return state.setIn(['error', 'userDiagnosisCreate'], action.payload.response.data.message);
    }
  }),
  ...pender({
    type: POST_USER_SYMPTOM,
    onSuccess: (state, action) => {
      return state.setIn(['error', 'userSymptomCreate'], null);
    },
    onError: (state, action) => {
      return state.setIn(['error', 'userSymptomCreate'], action.payload.response.data.message);
    }
  }),
  ...pender({
    type: POST_USER_MEDICINE,
    onSuccess: (state, action) => {
      return state.setIn(['error', 'userMedicineCreate'], null);
    },
    onError: (state, action) => {
      return state.setIn(['error', 'userMedicineCreate'], action.payload.response.data.message);
    }
  }),
  ...pender({
    type: POST_USER_MEDICINE_DOSAGE,
    onSuccess: (state, action) => {
      return state.setIn(['error', 'userMedicineDosageCreate'], null);
    },
    onError: (state, action) => {
      return state.setIn(['error', 'userMedicineDosageCreate'], action.payload.response.data.message);
    }
  }),
  ...pender({
    type: POST_USER_MEDICINE_PURPOSE,
    onSuccess: (state, action) => {
      return state.setIn(['error', 'userMedicinePurposeCreate'], null);
    },
    onError: (state, action) => {
      return state.setIn(['error', 'userMedicinePurposeCreate'], action.payload.response.data.message);
    }
  }),
  ...pender({
    type: POST_USER_MEDICINE_EVALUATION,
    onSuccess: (state, action) => {
      return state.setIn(['error', 'userMedicineEvaluationCreate'], null);
    },
    onError: (state, action) => {
      return state.setIn(['error', 'userMedicineEvaluationCreate'], action.payload.response.data.message);
    }
  })
}, initialState);