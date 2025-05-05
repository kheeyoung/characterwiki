"use server";
import DOMPurify from 'dompurify';

const htmlReader = (content: string) => {
    return <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />
};

export default htmlReader;