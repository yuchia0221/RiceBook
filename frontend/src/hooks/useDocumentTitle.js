import { useEffect, useState } from "react";

const useDocumentTitle = (title) => {
    const [documentTitle, setdocumentTitle] = useState(title);
    useEffect(() => {
        document.title = title;
        // eslint-disable-next-line
    }, [documentTitle]);

    return [documentTitle, setdocumentTitle];
};

export default useDocumentTitle;
