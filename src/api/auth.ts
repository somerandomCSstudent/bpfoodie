import { LoginDto, UserDto } from '../dto/Auth';

// Mock user list
let example_users: UserDto[] = [
    { id: 'u1', username: 'tesztelek', email: 'teszt@example.com' },
    { id: 'u2', username: 'annakovacs', email: 'anna@example.com' },
];

/**
 * @function login
 * Mock API call for user login.
 * @param {LoginDto} credentials User credentials.
 * @returns {Promise<UserDto>} The logged-in user object.
 * @throws {Error} if credentials are invalid.
 */
export const login = async (credentials: LoginDto): Promise<UserDto> => {
    return new Promise((resolve, reject) => {
        // Use let to store the result of the search
        let userFound = example_users.find(u => u.username === credentials.username);

        // Simple mock validation (username is enough for mock)
        if (userFound && credentials.password === 'password123') { 
            setTimeout(() => resolve(userFound), 500);
        } else {
            setTimeout(() => reject(new Error('Invalid username or password')), 500);
        }
    });
};

// ... more functions like register, logout etc.