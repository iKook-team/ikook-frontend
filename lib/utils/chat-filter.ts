/**
 * Utility to detect and mask personal contact information in text.
 * This is used to prevent platform disintermediation by masking emails,
 * phone numbers, and social media handles.
 */

const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

/**
 * Phone number regex:
 * Matches various formats:
 * +234 801 234 5678
 * 08012345678
 * +44 7123 456789
 * (123) 456-7890
 * 123-456-7890
 * 
 * We use a lookahead to ensure we don't match prices (e.g., 5,000)
 */
const PHONE_REGEX = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4,}/g;

/**
 * Social media handles and keywords:
 * Matches @username, IG: username, FB: username, WhatsApp: number, etc.
 */
const SOCIAL_REGEX = /(?:@\w+|IG:\s*\w+|FB:\s*\w+|WhatsApp:\s*\+?\d+|Instagram:\s*\w+|Facebook:\s*\w+)/gi;

/**
 * Keywords that should be masked to prevent sharing contact info.
 */
const KEYWORDS_REGEX = /\b(phone|address|account)\b/gi;

const MASK_TEXT = "[Contact Info Masked]";

export function maskContactInfo(text: string): string {
    if (!text) return text;

    let maskedText = text;

    // Mask Emails
    maskedText = maskedText.replace(EMAIL_REGEX, MASK_TEXT);

    // Mask Phone Numbers
    // We filter out potential false positives like short numbers or prices
    maskedText = maskedText.replace(PHONE_REGEX, (match) => {
        // If it looks like a price (e.g., 5,000 or 5.000), don't mask it
        if (/^\d{1,3}(?:[.,]\d{3})*$/.test(match.trim())) {
            return match;
        }

        // If it's too short to be a phone number, don't mask it
        const digitsOnly = match.replace(/\D/g, "");
        if (digitsOnly.length < 7) {
            return match;
        }

        return MASK_TEXT;
    });

    // Mask Social Handles
    maskedText = maskedText.replace(SOCIAL_REGEX, MASK_TEXT);

    // Mask Keywords
    maskedText = maskedText.replace(KEYWORDS_REGEX, MASK_TEXT);

    return maskedText;
}
