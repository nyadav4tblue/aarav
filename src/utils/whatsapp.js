/** Replace with your WhatsApp business number in E.164 without + (e.g. 14155552671). */
export const WHATSAPP_NUMBER = '15551234567'

/**
 * @param {string} productName
 * @returns {string}
 */
export function getWhatsAppEnquiryUrl(productName) {
  const text = `I am interested in ${productName}`
  const encoded = encodeURIComponent(text)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`
}
