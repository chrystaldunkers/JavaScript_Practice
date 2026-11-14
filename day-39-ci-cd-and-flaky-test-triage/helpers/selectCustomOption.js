async function selectCustomOption(page, control, optionName) {
  await control.click();
  // Meridian renders the option list outside the control.
  await page.getByRole('option', { name: optionName, exact: true }).click();
}

module.exports = { selectCustomOption };
