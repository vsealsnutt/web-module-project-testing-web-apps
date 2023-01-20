import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
    render (<ContactForm />);
});

test('renders the contact form header', () => {
    render (<ContactForm />);

    const header = screen.getByText('Contact Form');

    expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render (<ContactForm />);

    const firstNameInput = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstNameInput, 'name');

    const errorMessages = await screen.findAllByTestId('error');
    expect(errorMessages).toHaveLength(1);

});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render (<ContactForm />);

    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);

    await waitFor(() => {
        const errorMessages = screen.queryAllByTestId('error');
        expect(errorMessages).toHaveLength(3);
    });
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render (<ContactForm />);

    const firstNameInput = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstNameInput, 'Vanessa');

    const lastNameInput = screen.getByLabelText(/Last Name*/i);
    userEvent.type(lastNameInput, 'Seals-Nutt');

    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);

    await waitFor(() => {
        const errorMessages = screen.getAllByTestId('error');
        expect(errorMessages).toHaveLength(1);
    });
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render (<ContactForm />);

    const emailInput = screen.getByLabelText(/Email*/i);
    userEvent.type(emailInput, 'vanessa@');

    const errorMessage = await screen.findByText(/email must be a valid email address/i);
    expect(errorMessage).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render (<ContactForm />);

    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);

    const errorMessage = await screen.findByText(/lastName is a required field/i);
    expect(errorMessage).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render (<ContactForm />);

    const firstNameInput = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstNameInput, 'Vanessa');

    const lastNameInput = screen.getByLabelText(/Last Name*/i);
    userEvent.type(lastNameInput, 'Seals-Nutt');

    const emailInput = screen.getByLabelText(/Email*/i);
    userEvent.type(emailInput, 'vanessa@sealsnutt.com');

    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);

    await waitFor(() => {
        const firstNameDisplay = screen.queryByText('Vanessa');
        const lastNameDisplay = screen.queryByText('Seals-Nutt');
        const emailDisplay = screen.queryByText('vanessa@sealsnutt.com');
        const messageDisplay = screen.queryByTestId('messageDisplay');

        expect(firstNameDisplay).toBeInTheDocument();
        expect(lastNameDisplay).toBeInTheDocument();
        expect(emailDisplay).toBeInTheDocument();
        expect(messageDisplay).not.toBeInTheDocument();
    });
});

test('renders all fields text when all fields are submitted.', async () => {
    render (<ContactForm />);

    const firstNameInput = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstNameInput, 'Vanessa');

    const lastNameInput = screen.getByLabelText(/Last Name*/i);
    userEvent.type(lastNameInput, 'Seals-Nutt');

    const emailInput = screen.getByLabelText(/Email*/i);
    userEvent.type(emailInput, 'vanessa@sealsnutt.com');

    const messageInput = screen.getByLabelText(/Message/i);
    userEvent.type(messageInput, 'hello');

    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);

    await waitFor(() => {
        const firstNameDisplay = screen.queryByText('Vanessa');
        const lastNameDisplay = screen.queryByText('Seals-Nutt');
        const emailDisplay = screen.queryByText('vanessa@sealsnutt.com');
        const messageDisplay = screen.queryByText('hello');

        expect(firstNameDisplay).toBeInTheDocument();
        expect(lastNameDisplay).toBeInTheDocument();
        expect(emailDisplay).toBeInTheDocument();
        expect(messageDisplay).toBeInTheDocument();
    });
});
