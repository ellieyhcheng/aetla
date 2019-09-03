import React from 'react';
const ApiClientContext = React.createContext(null);

export const withApiClient = Component => props => (
    <ApiClientContext.Consumer>
        {apiClient => <Component {...props} apiClient={apiClient}/>}
    </ApiClientContext.Consumer>
)

export default ApiClientContext;