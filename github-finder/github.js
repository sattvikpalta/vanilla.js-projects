class GitHub {
  constructor() {
    this.client_id = 'bbb02db81f320624f45b'
    this.client_secret = 'c6a3a4dc2b038d9696919df0cf6300ea804660a5'
  }

  async getUser(user) {
    const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);

    const profile = await profileResponse.json();

    return {
      profile
    }
  }

}