import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication';
import { HttpPostClientSpy } from '@/data/test/mock-http-client';
import { MOCKAccountModel, MOCKAuthenticationFactory } from '@/domain/test/mock-account';
import faker from 'faker';
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors';
import { HttpStatusCode } from '@/data/models';
import { AuthenticationParams } from '@/domain/usecases/authentication';
import { AccountModel } from '@/domain/models/account.model';

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<AuthenticationParams, AccountModel>();
  const sut = new RemoteAuthentication(url, httpPostClientSpy);
  return { sut, httpPostClientSpy };
};

describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.auth(MOCKAuthenticationFactory());
    expect(httpPostClientSpy.url).toBe(url);
  });

  test('Should call HttpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const authenticationParams = MOCKAuthenticationFactory();
    await sut.auth(authenticationParams);
    expect(httpPostClientSpy.body).toEqual(authenticationParams);
  });

  test('Should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unathorized
    };
    const promise = sut.auth(MOCKAuthenticationFactory());
    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });

  test('Should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    };
    const promise = sut.auth(MOCKAuthenticationFactory());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    };
    const promise = sut.auth(MOCKAuthenticationFactory());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    };
    const promise = sut.auth(MOCKAuthenticationFactory());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should return an AccountModel if HttpPostClient returns 200', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const httpResult = MOCKAccountModel();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.success,
      body: httpResult
    };
    const account = await sut.auth(MOCKAuthenticationFactory());
    expect(account).toEqual(httpResult);
  });
});
