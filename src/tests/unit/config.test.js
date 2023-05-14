const checkJWT = require('../../config/startup');

const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});

describe('Verify if "MONGO_URL" connection string exists in ".env" file', () => {
  it('- should display "FATAL ERROR: MONGO_URL is not defined." on console', () => {
    global.console = { error: jest.fn() };
    checkJWT();
    expect(console.error).toBeCalled();
    expect(console.error).toHaveBeenCalledWith(
      'FATAL ERROR: MONGO_URL is not defined.'
    );
  });
  it('- should exit process with exit code 1 if "MONGO_URL" does not exists in ".env"', () => {
    checkJWT();
    expect(mockExit).toHaveBeenCalledWith(1);
  });
});
