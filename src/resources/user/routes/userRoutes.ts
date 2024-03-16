import { Router } from "express";
import { BcryptPasswordEncryptor } from "../../../core/services/BcryptPasswordEncryptor";
import { RegisterUserController } from "../controllers/RegisterUserController";
import { UserRepository } from "../repositories/UserRepository";
import { RegisterUser } from "../useCases/RegisterUser";
import { UserValidator } from "../validators/UserValidator";

const userRepository = new UserRepository()
const passowrdEncrypt = new BcryptPasswordEncryptor()
const userValidator = new UserValidator()

const registerUserUseCase = new RegisterUser(userRepository, passowrdEncrypt, userValidator)
const registerUserController = new RegisterUserController(registerUserUseCase)

const router = Router()

router.post('/', (req, res) => registerUserController.handle(req, res))

export { router as userRoutes }