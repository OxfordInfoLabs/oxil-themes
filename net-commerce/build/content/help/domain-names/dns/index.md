{
"title": "DNS (Domain Name Settings)",
"date": "2019-01-07T12:11:30Z",
"description": "Help documentation for DNS (Domain Name Settings).  How to enter and save DNS records for your domain name.  A review of the different categories of DNS records and links to further information.",

"categories": [],
"weight": 7
}

    From Dashboard > Domains > YOURDOMAIN.COM > DNS (Domain Name Settings)
    
DNS Settings are the records used to determine the routing of internet traffic for your domain name.  For example, you may set up a 'www' record to send traffic to your website server or hosting provider, and you may set up mail exchange records (MX records) to send traffic to your email provider.

We offer a FREE DNS service without a commercial Service Level Agreement.  It is in our interest to maintain a reliable DNS service, and in the background we use third-party providers such as Cloudflare to maintain business continuity.  For mission-critical services we recommend that you use your own commercial DNS provider (note we have our own Commercial DNS offerings in the pipeline).  Note, we do not enable all Cloudflare services, such as Application firewalls, etc.  To enable those services you can register your own Cloudflare account, and [set your own Nameservers](/help/domain-names/nameservers/) to those provided by Cloudflare. 

_Note: for any services that you purchase through {{< site-param "shortTitle" >}}, such as G Suite and email services, we offer to make this job easier for you by automatically setting up DNS records to resolve these services for you._ 

### Transfers

If you are either transferring a Domain Name to {{< site-param "shortTitle" >}} from another provider, or transferring your DNS services to {{< site-param "shortTitle" >}}, we will attempt to detect any published DNS records to use as a starting point.  Please review these records before saving them for use in production.

### Websites

DNS settings are where you configure your domain name to route internet traffic to your website.  You do this by entering 'A' records (entries) which will be provided by your website hosting provider.  Please consult your website hosting provider for DNS settings for your domain. _Note, domain names are sometimes referred to as 'custom domains'_.

> Note - you are not required to transfer your domain out of the {{< site-param "shortTitle" >}} system for it to work with third-party hosted websites. 

Please [contact our support team](/help/contact/contact-details/) if you encounter any issues.     

### Setting DNS Records

Having set your Nameservers to 'use FREE DNS' you can then add your own DNS records, as follows. There are plenty of [tutorials online about DNS records and how they work](https://code.tutsplus.com/tutorials/an-introduction-to-learning-and-using-dns-records--cms-24704). 

### Record types

Here are the different types of DNS records supported:

<dl>
<dt>Address Mapping - A records</dt>
<dd>The record specifies an IPV4 address for a host.</dd>
<dt>Address Mapping - AAAA records</dt>
<dd>The record specifies an IPV6 address for a host.</dd>

<dt>Canonical Name - CNAME records</dt>

<dd>The record specifies a domain name that has to be queried to resolve a domain name.  A domain name alias.</dd>

<dt>Mail Exchange - MX records</dt>

<dd>The record specifies a mail server for a host.</dd>

<dt>Address Mapping - A records</dt>

<dd>The record specifies an IPV4 address for a host.</dd>

<dt>Nameserver - NS records</dt>

<dd>The record specifies a Nameserver for the host.</dd>

<dt>Service of Authority - SOA records</dt>

<dd>The record specifies information about a DNS zone, primary nameserver, administrator, and refresh rate.  See [this WIKI](https://en.wikipedia.org/wiki/SOA_record) for a more detailed explanation. </dd> 

<dt>Reverse-lookup Pointer - PTR records</dt>

<dd>The record provides reverse lookup information - as opposed to an A record which is used to lookup an IP address for a given domain name, a PTR record is used to lookup a domain name from a given IP address.</dd>

<dt>Text - TXT records</dt>
 
<dd>The record specifies an arbitary string value.  Often you may be asked by an email provider, such as Google to create a TXT record for security purposes, so that they may use [Sender Policy Framework (SPF)](https://en.wikipedia.org/wiki/Sender_Policy_Framework) technology to check the authenticity of emails sent using your domain name.</dd>

</dl>

