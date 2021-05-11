
import { authLogin, authMe } from './authReducer';
import { APIResponseType, ResultCodesCaptcha, ResultCodesEnum } from '../api/api';
import { authAPI } from './../api/auth-api';
import { actions} from './authReducer';
jest.mock('../api/auth-api')
const authAPIMock = authAPI as jest.Mocked<typeof authAPI>

type MeResponseDataType = {
    id: number,
    email: string,
    login: string
}

type LoginResponseDataType = {
    userId: number,
}


beforeEach( () => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
})

const resultForAuthMe:APIResponseType<MeResponseDataType> = {
    resultCode: ResultCodesEnum.Success,
    messages: [],
    data: {
        id: 1,
        email: 'Email',
        login: 'Login',
    }
}


const resultForAuthLogin:APIResponseType<LoginResponseDataType, ResultCodesEnum | ResultCodesCaptcha>= {
    resultCode: ResultCodesEnum.Success,
    messages: [],
    data: {
        userId: 1
    }
}



authAPIMock.auth.mockReturnValue(Promise.resolve(resultForAuthMe))
authAPIMock.authLogin.mockReturnValue(Promise.resolve(resultForAuthLogin))

const dispatchMock = jest.fn()
const getStateMock = jest.fn()


test('AuthMe success passed',async () => {
    const thunk = authMe()
    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(1)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setAuthUserData(1, 'Email', 'Login', true))
})

test('Auth Login success passed', async () => {
    const thunk = authLogin('Email', 'Password', true, '')
    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(1)
})
