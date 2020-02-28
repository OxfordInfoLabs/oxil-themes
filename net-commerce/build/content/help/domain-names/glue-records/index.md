{
"title": "What are Glue Records?",
"date": "2019-02-04T13:12:48Z",
"description": "Help documentation - Glue records.  What is a glue record and why would you need to use it?",

"categories": []
}

    From Dashboard > Domains > YOURDOMAIN.COM > Glue records

### What is a Glue Record (or Additional record)?

A glue record (or additional record) is an [A Record (or IP Address)](/help/domain-names/dns/) assigned to a domain name or subdomain.  It helps break circular DNS lookups or 'impossible dependency'.

### When do you need a glue record?

Glue records are particularly important when the nameservers (eg. ns1, ns2) for a domain name (eg. domain.com) are the subdomains of the domain name itself.

#### Example

__Domain name:__ mydomain.com  
__Nameservers:__ alfred.cloudflare.net, jessie.cloudflare.net

    No Glue Record required

__Domain name:__ mydomain.com  
__Nameservers:__ ns1.mydomain.com, ns2.mydomain.com


    Glue Records required for ns1.mydomain.com and ns2.mydomain.com

### Setting a Glue Record
If you are providing your own authoritative nameservers we can provide Glue Records as your domain Registrar.  This is an expert function for those who are comfortable managing their own authoritative nameservers.  Simply enter nameserver domain names and IP addresses, as required.  
