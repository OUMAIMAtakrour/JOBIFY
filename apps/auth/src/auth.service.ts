import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import axios from 'axios';

interface AuthResponse {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;

}

@Injectable()
export class AuthServiceService {
  private keycloakUrl =
    'http://localhost:8080/realms/first-realm/protocol/openid-connect/token';
  private clientId = 'oumaima';
  // private clientSecret = 'm2rCB6qt0Oq2AcV84WqV3HbOdo8PWuN4';
  private scope = 'email openid';

  async login(data): Promise<any> {
    const { username, password } = data;

    try {
      const response = await axios.post<AuthResponse>(
        this.keycloakUrl,
        new URLSearchParams({
          grant_type: 'password',
          client_id: this.clientId,
          scope: this.scope,
          username,
          password,
        }),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        },
      );

      return response.data;
    } catch (error) {
      return new NotFoundException(error.response?.data);
    }
  }

  async getAdminToken(): Promise<string> {
    try {
      const response = await axios.post(
        this.keycloakUrl,
        new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: 'public-client',
          client_secret: 'm2rCB6qt0Oq2AcV84WqV3HbOdo8PWuN4',
        }),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        },
      );
      return response.data.access_token;
    } catch (error) {
      throw new HttpException('Failed to get admin token', 500);
    }
  }

  async register(data): Promise<any> {
    const { username, email, password } = data;

    try {
      const adminToken = await this.getAdminToken();

      const response = await axios.post(
        `http://localhost:8080/admin/realms/first-realm/users`,
        {
          username,
          email,
          enabled: true,
          credentials: [
            {
              type: 'password',
              value: password,
              temporary: false, // Optional: set true if you want the user to reset the password.
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return response.data; // Return created user details if needed.
    } catch (error) {
      console.error('Registration error:', error.response?.data);
      throw new HttpException('Registration failed', 500);
    }
  }
}
