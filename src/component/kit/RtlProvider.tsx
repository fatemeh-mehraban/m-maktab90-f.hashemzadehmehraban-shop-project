import React from 'react';
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";


const cacheRtl = createCache({
    key: "muirtl",
    // stylisPlugins: [prefixer, rtlPlugin]
});

const RtlProvider = ({ children }) => {

    return (
        <CacheProvider value={cacheRtl}>
            <div dir="rtl">
                {children}
            </div>
        </CacheProvider>
    );
};

export default RtlProvider;