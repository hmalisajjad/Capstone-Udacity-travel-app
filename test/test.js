import {checkForName} from '../src/client/js/apidata';

describe('Test "checkForName()" is exist', ()=>{
    const checkForNameFunction = jest.fn(checkForName)
    it('It must return right',() => {
        expect(checkForNameFunction).toBeDefined();
    });
    //test('It must return right', async()=>{
      //  expect(checkForName).tobeDefined();
    //});
});

describe('Test "checkForName()" is a function', ()=>{
    it('It must be function', () => {
        const checkForNameFunction = jest.fn(checkForName)
        expect(typeof checkForNameFunction).toBe("function");
    });
});
export {checkForName}