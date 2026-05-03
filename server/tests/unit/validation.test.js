const { loginSchema, ticketCreateSchema, userRegisterSchema } = require('../../utils/validation');

describe('Validation Schemas', () => {
    describe('loginSchema', () => {
        it('should validate correct login data', () => {
            const validData = {
                email: 'test@example.com',
                password: 'password123',
            };

            const { error } = loginSchema.validate(validData);

            expect(error).toBeUndefined();
        });

        it('should fail without email', () => {
            const invalidData = {
                password: 'password123',
            };

            const { error } = loginSchema.validate(invalidData);

            expect(error).toBeDefined();
            expect(error.details[0].message).toContain('Email');
        });

        it('should fail with invalid email format', () => {
            const invalidData = {
                email: 'invalid-email',
                password: 'password123',
            };

            const { error } = loginSchema.validate(invalidData);

            expect(error).toBeDefined();
            expect(error.details[0].message).toContain('email');
        });

        it('should fail without password', () => {
            const invalidData = {
                email: 'test@example.com',
            };

            const { error } = loginSchema.validate(invalidData);

            expect(error).toBeDefined();
            expect(error.details[0].message).toContain('Пароль');
        });

        it('should accept empty password string as missing', () => {
            const invalidData = {
                email: 'test@example.com',
                password: '',
            };

            const { error } = loginSchema.validate(invalidData);

            expect(error).toBeDefined();
        });
    });

    describe('userRegisterSchema', () => {
        it('should validate correct registration data', () => {
            const validData = {
                email: 'newuser@example.com',
                password: 'pass1234',
            };

            const { error } = userRegisterSchema.validate(validData);

            expect(error).toBeUndefined();
        });

        it('should fail with password less than 4 characters', () => {
            const invalidData = {
                email: 'newuser@example.com',
                password: 'abc',
            };

            const { error } = userRegisterSchema.validate(invalidData);

            expect(error).toBeDefined();
            expect(error.details[0].message).toContain('минимум 4 символа');
        });

        it('should fail with invalid email', () => {
            const invalidData = {
                email: 'not-an-email',
                password: 'password123',
            };

            const { error } = userRegisterSchema.validate(invalidData);

            expect(error).toBeDefined();
        });
    });

    describe('ticketCreateSchema', () => {
        it('should validate correct ticket data', () => {
            const validData = {
                name: 'Test Ticket',
                phone: '+1234567890',
                description: 'This is a test description',
            };

            const { error } = ticketCreateSchema.validate(validData);

            expect(error).toBeUndefined();
        });

        it('should validate ticket without description', () => {
            const validData = {
                name: 'Test Ticket',
                phone: '+1234567890',
            };

            const { error } = ticketCreateSchema.validate(validData);

            expect(error).toBeUndefined();
        });

        it('should accept null description', () => {
            const validData = {
                name: 'Test Ticket',
                phone: '+1234567890',
                description: null,
            };

            const { error } = ticketCreateSchema.validate(validData);

            expect(error).toBeUndefined();
        });

        it('should accept empty string description', () => {
            const validData = {
                name: 'Test Ticket',
                phone: '+1234567890',
                description: '',
            };

            const { error } = ticketCreateSchema.validate(validData);

            expect(error).toBeUndefined();
        });

        it('should fail without name', () => {
            const invalidData = {
                phone: '+1234567890',
            };

            const { error } = ticketCreateSchema.validate(invalidData);

            expect(error).toBeDefined();
            expect(error.details[0].message).toContain('Имя');
        });

        it('should fail with name less than 2 characters', () => {
            const invalidData = {
                name: 'A',
                phone: '+1234567890',
            };

            const { error } = ticketCreateSchema.validate(invalidData);

            expect(error).toBeDefined();
            expect(error.details[0].message).toContain('минимум 2 символа');
        });

        it('should fail with name more than 100 characters', () => {
            const invalidData = {
                name: 'A'.repeat(101),
                phone: '+1234567890',
            };

            const { error } = ticketCreateSchema.validate(invalidData);

            expect(error).toBeDefined();
            expect(error.details[0].message).toContain('100 символов');
        });

        it('should fail without phone', () => {
            const invalidData = {
                name: 'Test Ticket',
            };

            const { error } = ticketCreateSchema.validate(invalidData);

            expect(error).toBeDefined();
            expect(error.details[0].message).toContain('Телефон');
        });

        it('should fail with invalid phone format', () => {
            const invalidData = {
                name: 'Test Ticket',
                phone: 'abc-def-ghi',
            };

            const { error } = ticketCreateSchema.validate(invalidData);

            expect(error).toBeDefined();
            expect(error.details[0].message).toContain('формат телефона');
        });

        it('should fail with phone less than 5 characters', () => {
            const invalidData = {
                name: 'Test Ticket',
                phone: '1234',
            };

            const { error } = ticketCreateSchema.validate(invalidData);

            expect(error).toBeDefined();
            expect(error.details[0].message).toContain('слишком короткий');
        });

        it('should accept valid phone formats', () => {
            const validPhones = [
                '+1234567890',
                '123-456-7890',
                '+7 (999) 123-45-67',
                '8 800 123 45 67',
                '12345',
            ];

            validPhones.forEach(phone => {
                const validData = {
                    name: 'Test Ticket',
                    phone: phone,
                };

                const { error } = ticketCreateSchema.validate(validData);
                expect(error).toBeUndefined();
            });
        });

        it('should fail with description more than 500 characters', () => {
            const invalidData = {
                name: 'Test Ticket',
                phone: '+1234567890',
                description: 'A'.repeat(501),
            };

            const { error } = ticketCreateSchema.validate(invalidData);

            expect(error).toBeDefined();
            expect(error.details[0].message).toContain('500 символов');
        });
    });
});
