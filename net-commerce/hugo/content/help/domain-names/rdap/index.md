{
"title": "RDAP",
"date": "2019-07-03T10:55:00+01:00",
"description": 
"Netistrar's Help Documentation about Rdap and more",
"categories": [],
"weight": 13
}



#### Introduction
{{< site-param "netistrarResellerIntro" >}}  Netistrar provides an RDAP service for querying publicly available data for registered domain records under management. 

RDAP is intended to be a light weight and standards based replacement for the WHOIS system and provides better extensibility 
for future enhancement.  

The implementation provided by Netistrar has been developed in accordance with the requirements outlined 
by [ICANN](https://www.icann.org/rdap) for Domain Registrars.

  
#### Basic usage

The RDAP system uses [REST](https://standards.rest/) based services to provide access to publicly available domain name data using standardised [JSON](https://tools.ietf.org/html/rfc7158/) data 
format to return results.  

RDAP supports the **GET** and **HEAD** HTTP verbs for providing full responses and header only responses respectively.


The Netistrar RDAP service is hosted at https://rdap.netistrar.com

##### Domain Name Queries

**Request**

To issue a request for a domain name issue the following HTTP GET request

`HTTP GET https://rdap.netistrar.com/rdap/domain/DOMAIN_NAME`

e.g. 

`curl -X GET https://rdap.netistrar.com/rdap/domain/netistrar.com`

substituting the value of DOMAIN_NAME accordingly

Or for just the headers, issue the following HTTP HEADER request

`HTTP HEAD https://rdap.netistrar.com/rdap/domain/DOMAIN_NAME`

e.g. 

`curl -I https://rdap.netistrar.com/rdap/domain/netistrar.com`

**Responses**

If the domain name is currently under management by Netistrar a JSON response will be returned in the format defined by the 
[ICANN RDAP specification]((https://www.icann.org/rdap)) for Registrar RDAP responses with a HTTP status code of 200.

e.g. for **netistrar.com** <a href="javascript:kinibindView.models.expandResponse = true;">click here</a> to show the full response

<div kb-if="expandResponse">
<pre>
<code>

{{
  "objectClassName": "domain",
  "handle": "1800011560_DOMAIN_COM-VRSN",
  "ldhName": "NETISTRAR.COM",
  "nameservers": [
    {
      "objectClassName": "nameserver",
      "ldhName": "abby.ns.cloudflare.com",
      "events": [
        {
          "eventAction": "registration",
          "eventDate": "2013-05-09T06:02:05+01:00"
        }},
        {{
          "eventAction": "last changed",
          "eventDate": "2018-09-14T10:30:22+01:00"
        }},
        {{
          "eventAction": "last update of RDAP database",
          "eventDate": "2019-07-03T12:19:34+01:00"
        }}
      ]
    },
    {
      "objectClassName": "nameserver",
      "ldhName": "henry.ns.cloudflare.com",
      "events": [
        {
          "eventAction": "registration",
          "eventDate": "2013-05-09T06:02:05+01:00"
        }},
        {{
          "eventAction": "last changed",
          "eventDate": "2018-09-14T10:30:22+01:00"
        }},
        {{
          "eventAction": "last update of RDAP database",
          "eventDate": "2019-07-03T12:19:34+01:00"
        }}
      ]
    }
  ],
  "entities": [
    {{
      "objectClassName": "entity",
      "handle": "NETCON1575",
      "vcardArray": [
        "vcard",
        [
          [
            "version",
            {}},
            "text",
            "4.0"
          ],
          [
            "fn",
            {{}},
            "text",
            "Netistrar LTD "
          ],
          [
            "org",
            {
              "type": "work"
            },
            "text",
            "Netistrar Ltd"
          ],
          [
            "adr",
            {{}},
            "text",
            [
              "Repton House",
              "Bretby Business Park",
              "Burton-on-Trent",
              "Derbyshire",
              "DE15 0YZ",
              "GB"
            ]
          ],
          [
            "email",
            {{}},
            "text",
            "info@netistrar.com"
          ]
        ]
      ],
      "roles": [
        "registrant"
      ],
      "status": [],
      "remarks": [],
      "events": [
        {{
          "eventAction": "registration",
          "eventDate": "2013-05-09T06:02:05+01:00"
        }},
        {{
          "eventAction": "last changed",
          "eventDate": "2018-09-14T10:30:22+01:00"
        }},
        {{
          "eventAction": "last update of RDAP database",
          "eventDate": "2019-07-03T12:19:34+01:00"
        }}
      ]
    },
    {{
      "objectClassName": "entity",
      "handle": "NETCON1576",
      "vcardArray": [
        "vcard",
        [
          [
            "version",
            {},
            "text",
            "4.0"
          ],
          [
            "fn",
            {},
            "text",
            "Netistrar LTD"
          ],
          [
            "org",
            {
              "type": "work"
            },
            "text",
            "Netistrar Ltd"
          ],
          [
            "email",
            {},
            "text",
            "info@netistrar.com"
          ]
        ]
      ],
      "roles": [
        "administrative"
      ],
      "status": [],
      "remarks": [],
      "events": [
        {{
          "eventAction": "registration",
          "eventDate": "2013-05-09T06:02:05+01:00"
        }},
        {{
          "eventAction": "last changed",
          "eventDate": "2018-09-14T10:30:22+01:00"
        }},
        {{
          "eventAction": "last update of RDAP database",
          "eventDate": "2019-07-03T12:19:34+01:00"
        }}
      ]
    },
    {
      "objectClassName": "entity",
      "handle": "NETCON11008",
      "vcardArray": [
        "vcard",
        [
          [
            "version",
            {},
            "text",
            "4.0"
          ],
          [
            "fn",
            {},
            "text",
            "Netistrar LTD "
          ],
          [
            "org",
            {
              "type": "work"
            },
            "text",
            "Netistrar Ltd"
          ],
          [
            "email",
            {},
            "text",
            "info@netistrar.com"
          ]
        ]
      ],
      "roles": [
        "billing"
      ],
      "status": [],
      "remarks": [],
      "events": [
        {{
          "eventAction": "registration",
          "eventDate": "2013-05-09T06:02:05+01:00"
        }},
        {{
          "eventAction": "last changed",
          "eventDate": "2018-09-14T10:30:22+01:00"
        }},
        {{
          "eventAction": "last update of RDAP database",
          "eventDate": "2019-07-03T12:19:34+01:00"
        }}
      ]
    },
    {
      "objectClassName": "entity",
      "handle": "NETCON11012",
      "vcardArray": [
        "vcard",
        [
          [
            "version",
            {},
            "text",
            "4.0"
          ],
          [
            "fn",
            {},
            "text",
            "Netistrar LTD "
          ],
          [
            "org",
            {
              "type": "work"
            },
            "text",
            "Netistrar Ltd"
          ],
          [
            "email",
            {},
            "text",
            "info@netistrar.com"
          ]
        ]
      ],
      "roles": [
        "technical"
      ],
      "status": [],
      "remarks": [],
      "events": [
        {{
          "eventAction": "registration",
          "eventDate": "2013-05-09T06:02:05+01:00"
        }},
        {{
          "eventAction": "last changed",
          "eventDate": "2018-09-14T10:30:22+01:00"
        }},
        {{
          "eventAction": "last update of RDAP database",
          "eventDate": "2019-07-03T12:19:34+01:00"
        }}
      ]
    },
    {
      "objectClassName": "entity",
      "handle": "1755",
      "publicIds": [
        {
          "type": "IANA Registrar ID",
          "identifier": "1755"
        }
      ],
      "vcardArray": [
        "vcard",
        [
          [
            "version",
            {},
            "text",
            "4.0"
          ],
          [
            "fn",
            {},
            "text",
            "NETISTRAR"
          ]
        ]
      ],
      "entities": [
        {
          "objectClassName": "entity",
          "vcardArray": [
            [
              "version",
              {},
              "text",
              "4.0"
            ],
            [
              "tel",
              {
                "type": [
                  "voice"
                ]
              },
              "uri",
              "tel:+44.3302233927"
            ],
            [
              "email",
              {},
              "text",
              "abuse@netistrar.com"
            ]
          ],
          "roles": [
            "abuse"
          ]
        }
      ],
      "roles": [
        "registrar"
      ]
    }
  ],
  "secureDNS": {
    "delegationSigned": false
  },
  "status": [
    "active",
    "transfer prohibited",
    "delete prohibited"
  ],
  "notices": [
    {
      "title": "Terms of Use",
      "description": [
        "Terms of use for the RDAP service"
      ],
      "links": [
        {
          "value": "https:\/\/rdap.netistrar-stage.uk\/rdap\/domain\/NETISTRAR.COM",
          "rel": "alternate",
          "type": "text\/html",
          "href": "https:\/\/netistrar.com\/terms\/domain-name-terms\/rdap-terms\/"
        }
      ]
    }
  ],
  "remarks": [
    {{
      "description": [
        "This response conforms to the RDAP Operational Profile for gTLD Registries and Registrars version 1.0"
      ]
    }},
    {
      "title": "EPP Status Codes",
      "description": "For more information on domain status codes, please visit https:\/\/icann.org\/epp",
      "links": [
        {
          "value": "https:\/\/rdap.netistrar-stage.uk\/rdap\/domain\/NETISTRAR.COM",
          "rel": "altenate",
          "type": "text\/html",
          "href": "https:\/\/icann.org\/epp"
        }
      ]
    },
    {
      "title": "Whois Inaccuracy Complaint Form",
      "description": "URL of the ICANN Whois Inaccuracy Complaint Form: https:\/\/www.icann.org\/wicf",
      "links": [
        {
          "value": "https:\/\/rdap.netistrar-stage.uk\/rdap\/domain\/NETISTRAR.COM",
          "rel": "altenate",
          "type": "text\/html",
          "href": "https:\/\/icann.org\/wicf"
        }
      ]
    }
  ],
  "events": [
    {{
      "eventAction": "registration",
      "eventDate": "2013-05-09T06:02:05+01:00"
    }},
    {{
      "eventAction": "expiration",
      "eventDate": "2022-05-09T06:02:05+01:00"
    }},
    {{
      "eventAction": "last changed",
      "eventDate": "2018-09-14T10:30:22+01:00"
    }},
    {{
      "eventAction": "last update of RDAP database",
      "eventDate": "2019-07-03T12:19:34+01:00"
    }}
  ],
  "rdapConformance": [
    "rdap_level_0"
  ]
}
</code>
</pre>
</div>

If a query is made for a domain which is not currently under management by Netistrar an error response will be
generated with an HTTP status code of 404

e.g. for for **idontexist.com** the response would be 

<pre>
<code>
{{
  "errorCode": 404,
  "title": "The requested domain name does not exist",
  "description": [
    "You have attempted a query for a domain name for which NETISTRAR is not the sponsoring Registrar."
  ]
  
}}
</code>
</pre>

##### Help Queries

The Netistrar RDAP service also implements an RDAP help endpoint which can be called by issuing the following HTTP GET request

`HTTP GET https://rdap.netistrar.com/rdap/help`

This will always return the following response referring callers to this page.

<pre>
<code>
{{
  "links": [
    {
      "value": "https://rdap.netistrar-stage.uk/rdap/help",
      "rel": "alternate",
      "type": "text/html",
      "href": "https://netistrar.com/help/domain-names/rdap"
    }
  ],
  "rdapConformance": [
    "rdap_level_0"
  ]
}}

</code>
</pre>


#### Rate Limiting

The Netistrar RDAP service is rate limited to 60 requests per minute per connection.  This includes successful
and unsuccessful queries returning errors.   

All non rate limited responses are returned with the following response headers which provide the status of your connection rate limit.
 
 `X-RateLimit-Limit` - always set to 60.
 
 `X-RateLimit-Remaining` - set to a number between 0 and 59 according to how many requests are remaining until the next time period
 
 `X-RateLimit-Reset` - the time (in seconds since epoch) when the rate limit will be reset to 60.
 

If the rate limit is exceeded the following example response will be returned for all requests with an HTTP status code of 429

<pre>
<code>
{{
  "exceptionClass": "\\Kinikit\\MVC\\Exception\\RateLimitExceededException",
  "message": "Rate limit of 60 exceeded for 127.0.0.1.  You can make another request after 03/07/2019 11:55:00",
  "code": 0

}}
</code>
</pre>



#### Policies and terms

The Netistrar policy for the RDAP service can be found [here](/terms/policies/privacy/).

For terms and conditions please click [here](/terms/domain-name-terms/rdap-terms/).
