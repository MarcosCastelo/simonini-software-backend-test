import { Router } from "express";
import { BcryptPasswordEncryptor } from "../../../core/services/BcryptPasswordEncryptor";
import { RegisterUserController } from "../controllers/RegisterUserController";
import { UserRepository } from "../repositories/UserRepository";
import { RegisterUser } from "../useCases/RegisterUser";
import { UserValidator } from "../validators/UserValidator";
import { LoginUser } from "../useCases/LoginUser";
import { BcryptPasswordComparer } from "../../../core/services/Bcrypt.PasswordComparer";
import { JwtTokenGenerator } from "../../../core/auth/JwtTokenGenerator";
import { LoginValidator } from "../validators/LoginValidator";
import { LoginUserController } from "../controllers/LoginUserController";

const userRepository = new UserRepository()
const passowrdEncrypt = new BcryptPasswordEncryptor()
const passwordComparer = new BcryptPasswordComparer()
const userValidator = new UserValidator()
const tokenGenerator = new JwtTokenGenerator()
const loginValidator = new LoginValidator()

const registerUserUseCase = new RegisterUser(userRepository, passowrdEncrypt, userValidator)
const registerUserController = new RegisterUserController(registerUserUseCase)

const loginUserUseCase = new LoginUser(userRepository, passwordComparer, tokenGenerator, loginValidator)
const loginUserController = new LoginUserController(loginUserUseCase)

const router = Router()

router.post('/', (req, res) => registerUserController.handle(req, res))
router.post('/login', (req, res) => loginUserController.handle(req, res))

export { router as userRoutes }