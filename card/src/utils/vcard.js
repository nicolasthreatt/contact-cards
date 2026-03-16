export function buildVCard(contactInfo, title) {
  const nameParts = contactInfo.fullName.trim().split(/\s+/).filter(Boolean);
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ');

  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${lastName};${firstName};;;`,
    `FN:${contactInfo.fullName}`,
    `TITLE:${title}`,
    `EMAIL;TYPE=INTERNET:${contactInfo.email}`,
    `ADR;TYPE=WORK:;;${contactInfo.location};;;;`,
    `URL;TYPE=GitHub:${contactInfo.githubUrl}`,
    `URL;TYPE=LinkedIn:${contactInfo.linkedinUrl}`,
    'END:VCARD',
  ].join('\r\n');
}
