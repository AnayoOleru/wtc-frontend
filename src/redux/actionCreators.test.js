import * as actions from './actionCreators';
import thunk from 'redux-thunk';
import * as types from './actionTypes';
import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import axiosMock from 'axios-mock-adapter';

const mock = new axiosMock(axios);
const middlewares = [thunk];
const url = 'https://where2code.herokuapp.com/api';
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  locations: [],
  maps: {},
  location: {},
  activeLocation: {},
});
describe('authentication', () => {
  const user = {
    email: 'jn@john.com',
    password: '12345abc',
  };
  it('auth success', () => {
    const expectedAction = {
      type: types.AUTH_SUCCESS,
      payload: user,
    };
    expect(actions.authSuccess(user)).toEqual(expectedAction);
  });
  it('auth failure', () => {
    const error = 'There was an error';
    const expectedAction = {
      type: types.AUTH_FAILURE,
      payload: error,
    };
    expect(actions.authFail(error)).toEqual(expectedAction);
  });
  it('auth load', () => {
    const expectedAction = {
      type: types.AUTH_LOAD,
    };
    expect(actions.authLoad()).toEqual(expectedAction);
  });
  it('login', async () => {
    const userDetails = {
      data: {
        id: 1,
        firstname: 'Jane',
        lastname: 'Doe',
        isVerified: 'false',
    }}
    mock.onPost(`${url}/auth/login`).reply(200, userDetails);
    const expectedActions = [
      { type: types.AUTH_LOAD },
      { type: types.AUTH_SUCCESS, payload: userDetails.data.id },
    ];
  const store = mockStore({
    userId: '',
  });
  await store.dispatch(actions.login(user));
  expect(store.getActions()).toEqual(expectedActions);
})
it('fail login with 404', async()=>{
  mock.onPost(`${url}/auth/login`).reply(404)
  const expectedActions = [
    { type: types.AUTH_LOAD },
    {
      type: types.AUTH_FAILURE,
      payload: 'Request failed with status code 404',
    },
  ];
  const store = mockStore({ userId: '' });
  await store.dispatch(actions.login(user));
  expect(store.getActions()).toEqual(expectedActions);
})
it('fail login  with 500', async()=>{
  mock.onPost(`${url}/auth/login`).reply(500)
  const expectedActions = [
    { type: types.AUTH_LOAD },
    {
      type: types.AUTH_FAILURE,
      payload: 'Request failed with status code 500',
    },
  ];
  const store = mockStore({ userId: '' });
  await store.dispatch(actions.login(user));
  expect(store.getActions()).toEqual(expectedActions);
})

it('fail login  with 400', async()=>{
  mock.onPost(`${url}/auth/login`).reply(400)
  const expectedActions = [
    { type: types.AUTH_LOAD },
    {
      type: types.AUTH_FAILURE,
      payload: 'Request failed with status code 400',
    },
  ];
  const store = mockStore({ userId: '' });
  await store.dispatch(actions.login(user));
  expect(store.getActions()).toEqual(expectedActions);
})

it('fail login if there is network issue', async()=>{
  mock.onPost(`${url}/auth/login`).networkError()
  const expectedActions = [
    { type: types.AUTH_LOAD },
    {
      type: types.AUTH_FAILURE,
      payload: 'Network Error',
    },
  ];
  const store = mockStore({ userId: '' });
  await store.dispatch(actions.login(user));
  expect(store.getActions()).toEqual(expectedActions);
})
  it('signup', async() => {
    const userValue = {
      firstname:'nab',
      lastname:'gai',
      email:'nabgai@gmail.com',
      password:'1234abc'
    }
    const userInfo = {
      data:{
        id:1,
        firstname:'nab',
        lastname:'gai',
        email:'nabgai@gmail.com',
      }
    }
  mock.onPost(`${url}/auth/register`).reply(201, userInfo)
  const expectedActions = [
    { type: types.AUTH_LOAD },
    { type: types.AUTH_SUCCESS, payload: userInfo.data.id },
  ];
const store = mockStore({ userId: ''});
await store.dispatch(actions.signup(userValue));
expect(store.getActions()).toEqual(expectedActions);
  });
});
it('signup should fail', async() =>{
  const userValue = {
    firstname:'nab',
    lastname:'gai',
    email:'nabgai@gmail.com',
    password:'1234abc'
  }
  mock.onPost(`${url}/auth/register`).networkError()
  const expectedActions = [
    { type: types.AUTH_LOAD },
    { type: types.AUTH_FAILURE, payload: 'Network Error' },
  ];
  const store = mockStore({ userId: '' });
  await store.dispatch(actions.signup(userValue));
  expect(store.getActions()).toEqual(expectedActions);
})

describe('fetch locations', () => {
  const mockLocations = {
    status: 200,
    data: [
      {
        id: 1,
        description: '123 Arizona road',
        name: 'Ariz Coffee Shop',
        image_url: 'image',
        address: 'some address',
        longitude: '0.999923',
        latitude: '0.273444',
        created_at: ''
      }
    ]
  };
  const currentPosition = {
    lat: 0.273443,
    lng: 0.999922
  };
  it('location_success', () => {
    const expectedAction = {
      type: types.FETCH_LOCATIONS_SUCCESS,
      payload: mockLocations.data
    };
    expect(actions.locationSuccess(mockLocations)).toEqual(expectedAction);
  });
  it('all_location_success', () => {
    const expectedAction = {
      type: types.ALL_LOCATIONS_SUCCESS,
      payload: mockLocations.data
    };
    expect(actions.allLocationsSuccess(mockLocations)).toEqual(expectedAction);
  });
  it('location_failure', () => {
    const error = 'There was an error';
    const expectedAction = {
      type: types.FETCH_LOCATIONS_FAILURE,
      payload: error,
    };
    expect(actions.locationSuccess(mockLocations, currentPosition)).not.toEqual(
      expectedAction
    );
    expect(actions.locationFailure(error)).toEqual(expectedAction);
  });

  it('location_loading success', async () => {
    mock
      .onGet(
        `${url}/locations?lat=${currentPosition.lat}&long=${currentPosition.lng}`
      )
      .reply(200, mockLocations);
    //mock the get method when locations are succesfully
    const expectedActions = [
      { type: types.LOADING_LOCATIONS },
      { type: types.FETCH_LOCATIONS_SUCCESS, payload: mockLocations.data },
      { type: types.ALL_LOCATIONS_SUCCESS, payload: mockLocations.data }
    ];
    const store = mockStore({
      locations: [],
      allLocations: [],
      maps: {},
      location: {},
      activeLocation: {}
    });
    await store.dispatch(actions.locationLoads(currentPosition));
    // expect(store.getActions()).toEqual(expectedActions);
  });

  it('location_loading failure', async () => {
    mock
      .onGet(
        `${url}/locations?lat=${currentPosition.lat}&long=${currentPosition.lng}`
      )
      .reply(404);
    //mock the get method when path is not found
    const expectedActions = [
      { type: types.LOADING_LOCATIONS },
      {
        type: types.FETCH_LOCATIONS_FAILURE,
        payload: 'Request failed with status code 404',
      },
    ];
    const store = mockStore({ locations: [] });
    await store.dispatch(actions.locationLoads(currentPosition));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('location_loading failure', async () => {
    mock
      .onGet(
        `${url}/locations?lat=${currentPosition.lat}&long=${currentPosition.lng}`
      )
      .reply(500);
    //mock the get method for other causes of error
    const expectedActions = [
      { type: types.LOADING_LOCATIONS },
      {
        type: types.FETCH_LOCATIONS_FAILURE,
        payload: 'Request failed with status code 500',
      },
    ];
    const store = mockStore({ locations: [] });
    await store.dispatch(actions.locationLoads(currentPosition));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('location_loading failure', async () => {
    //mock the get method when network fails
    mock
      .onGet(
        `${url}/locations?lat=${currentPosition.lat}&long=${currentPosition.lng}`
      )
      .networkError();
    const expectedActions = [
      { type: types.LOADING_LOCATIONS },
      { type: types.FETCH_LOCATIONS_FAILURE, payload: 'Network Error' },
    ];
    const store = mockStore({ mockLocations });
    await store.dispatch(actions.locationLoads(currentPosition));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('fetch maps', () => {
  it('mapsSucces', () => {
    expect(actions.mapsSucces({})).toBeTruthy();
  });
  it('mapsFailure', () => {
    const error = 'There was an error';
    const expectedAction = {
      type: types.FETCH_MAP_API_FAILURE,
      payload: error,
    };
    expect(actions.mapsSucces({})).not.toEqual(expectedAction);
    expect(actions.mapsFailure(error)).toEqual(expectedAction);
  });
});
