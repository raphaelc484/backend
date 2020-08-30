import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakesUsersRepository';
import FakesUsersTokensRepository from '../repositories/fakes/FakesUsersTokensRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUserRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakesUsersTokensRepository: FakesUsersTokensRepository;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakesUsersTokensRepository = new FakesUsersTokensRepository();

    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUserRepository,
      fakeMailProvider,
      fakesUsersTokensRepository,
    );
  });

  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    await fakeUserRepository.create({
      name: 'Raphael Doe',
      email: 'raphaelDoe@teste.com',
      password: '123456',
    });

    await sendForgotPasswordEmailService.execute({
      email: 'raphaelDoe@teste.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover non-existing user password', async () => {
    await expect(
      sendForgotPasswordEmailService.execute({
        email: 'raphaelDoe@teste.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakesUsersTokensRepository, 'generate');
    const user = await fakeUserRepository.create({
      name: 'Raphael Doe',
      email: 'raphaelDoe@teste.com',
      password: '123456',
    });

    await sendForgotPasswordEmailService.execute({
      email: 'raphaelDoe@teste.com',
    });

    expect(generateToken).toBeCalledWith(user.id);
  });
});
