
{
"title": "Connecting to other email providers",
"date": "2018-10-25T18:18:12+01:00",
"description": "How to configure your domain name to work with email.  Also, how to configure your domain name for third party email providers.",

"categories": []
}

To setup other email providers to use your domain, allowing you to have an email associated with your domain (e.g. me@mynewdomain.co.uk), you add MX records to your DNS settings. Your email provider will provide you with the required MX records information. Steps for two of the most popular email services, Gmail by Google and Microsoft Office 365 are detailed below.

### Editing your own MX records using the {{< site-param "shortTitle" >}} DNS system

We provide full guidance for managing DNS records in [the help documentation for managing DNS records](/help/domain-names/dns/), here we focus on managing MX records (Mail Exchange Server records) for email services.

To add or edit MX records for a domain registered on (or transferred to) {{< site-param "shortTitle" >}} go to your Dashboard, then select the 'Manage Domains' option, and find the domain you wish to add/edit records for by searching in the bar above the list of domains. Click on the domain you wish to change. Then go to the 'DNS' option on the left hand menu. If you wish to edit an existing record, do this by hitting the pencil icon next to that record. To a new MX (or TXT) record, click 'Add DNS record' at the top.


### Gmail by Google

As an official Google Cloud Partner, {{< site-param "shortTitle" >}} offers the full range of G Suite packages (Basic, Business and Enterprise) including Gmail to our customers at discount to published prices.

We also configure all DNS MX records and settings to make your email work with your own domain name out of the box.
<p class="pt1 pb3 flex-grid">
<a class="but inv mt3" href="/email/gsuite/">Review our G Suite packages <i class="net-chevron-right"></i></a>
</p>
#### Configuring your own Gmail settings
Setup of G Suite (formerly Google Apps) with your domain is easy with {{< site-param "shortTitle" >}}. No manual entry of MX records is required. Simply go to your Dashboard, hit Manage Domains, choose the domain you wish to setup with G Suite, and hit Email on the left hand menu.


Go to your G Suite Admin console, and find your G Suite verification code, with the format google-site-verification=xxxxxxxxxxxxxx.... 

Copy this value onto your clipboard and paste it into the 'Verification code' box under the 'Google Apps for email' heading on the {{< site-param "shortTitle" >}} email page, then simply hit 'Setup Google Apps for email'. Note: confirming this will wipe any previous MX records associated with your domain.

We will automatically setup the required MX records and verification for your domain. You can check this by scrolling to the bottom of the page and seeing the list of google MX records.

If G Suite is already setup with a different Google account and you wish to change it, simply paste your new Google verification code into the 'Verification code' box and click 'Reset Google Apps for email settings'. Note: confirming this will wipe any previous MX records associated with your domain.

If you wish to set up G Suite manually (not recommended), see [https://support.google.com/a/answer/140034](https://support.google.com/a/answer/140034) for info on G Suite MX record setup.

### Microsoft Office 365
To setup Office 365 with a domain you operate on {{< site-param "shortTitle" >}}, we recommend following the general steps at Microsoft's official guide: [https://support.office.com/en-ie/article/Create-DNS-records-for-Office-365-at-any-DNS-hosting-provider-7b7b075d-79f9-4e37-8a9e-fb60c1d95166](https://support.office.com/en-ie/article/Create-DNS-records-for-Office-365-at-any-DNS-hosting-provider-7b7b075d-79f9-4e37-8a9e-fb60c1d95166). 

Microsoft requires you to use a verification key with your MX records. See the 'Manually editing MX records' at the top of this page for info on how to add the necessary records.
