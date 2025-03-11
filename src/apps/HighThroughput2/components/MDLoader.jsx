import React, { useEffect, useState } from 'react';
import { Remarkable } from "remarkable";

const MarkdownLoader = ({ url }) => {
    const [content, setContent] = useState('');

    useEffect(() => {
        const loadMarkdown = async () => {
            try {
                const response = await fetch(url);
                const text = await response.text();
                const md = new Remarkable();
                const htmlContent = md.render(text);
                setContent(htmlContent);
            } catch (error) {
                console.error("Error loading info: ", error);
            }
        };

        loadMarkdown();
    }, [url]);

    return (
        <div
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
};
export default MarkdownLoader;
