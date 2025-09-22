export default function safeID(id) {
    return id.replace(/-/g, '_').replace(/\s+/g, '');
}