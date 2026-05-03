const mongoose = require('mongoose');
const User = require('../../models/User');

describe('User Model', () => {
    describe('Schema Validation', () => {
        it('should create a valid user with correct email and password', async () => {
            const userData = {
                email: 'test@example.com',
                password: 'pass1234',
            };

            const user = new User(userData);
            const savedUser = await user.save();

            expect(savedUser._id).toBeDefined();
            expect(savedUser.email).toBe(userData.email.toLowerCase());
            expect(savedUser.password).toBe(userData.password);
        });

        it('should fail to create user without email', async () => {
            const userData = {
                password: 'pass1234',
            };

            const user = new User(userData);
            
            await expect(user.save()).rejects.toThrow(mongoose.Error.ValidationError);
        });

        it('should fail to create user with invalid email format', async () => {
            const userData = {
                email: 'invalid-email',
                password: 'pass1234',
            };

            const user = new User(userData);
            
            await expect(user.save()).rejects.toThrow(mongoose.Error.ValidationError);
        });

        it('should fail to create user with password less than 4 characters', async () => {
            const userData = {
                email: 'test@example.com',
                password: 'abc',
            };

            const user = new User(userData);
            
            await expect(user.save()).rejects.toThrow(mongoose.Error.ValidationError);
        });

        it('should convert email to lowercase', async () => {
            const userData = {
                email: 'Test@Example.COM',
                password: 'pass1234',
            };

            const user = new User(userData);
            const savedUser = await user.save();

            expect(savedUser.email).toBe('test@example.com');
        });

        it('should trim whitespace from email', async () => {
            const userData = {
                email: '  test@example.com  ',
                password: 'pass1234',
            };

            const user = new User(userData);
            const savedUser = await user.save();

            expect(savedUser.email).toBe('test@example.com');
        });
    });

    describe('Unique Email Constraint', () => {
        it('should not allow duplicate emails', async () => {
            const userData = {
                email: 'duplicate@example.com',
                password: 'pass1234',
            };

            await User.create(userData);

            const duplicateUser = new User(userData);
            
            await expect(duplicateUser.save()).rejects.toThrow(mongoose.Error.ValidationError);
        });
    });
});
