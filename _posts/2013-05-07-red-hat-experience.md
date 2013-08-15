---
layout: post.html
title: "Current"
employer: "Red Hat, Inc"
position: "Associate Software Engineer"
tags: [resume]
category: [resume, experience, current]
dateemp: "October 2012 – present"
---

* Develop and contribute to [freeIPA][1], an open-sourced, Linux-based identity management system written in Python.
* Integrate freeIPA into key Open Source projects, including [OpenShift Origin][2], [OpenShift Enterprise][6], and [OpenShift CLI tools][5].
* Create better installation tools for freeIPA with provisioners like [Puppet + IPA][7], and [Vagrant + IPA][9], as well as [Puppet + OpenShift + IPA][3] and [Vagrant + OpenShift + IPA][8].
* Design and implement features to better improve IPA for integration projects, e.g. [better integration with external provisioning systems][13], including [Puppet][15], and the [ability to work with updating IPA’s DNS more user-friendly][14].
* Act as an ambassador between Open Source projects and freeIPA to improve communication, implementation, and community.

Related documentation written for integration:

* [OpenShift Broker + mod_auth_kerb for IdM/IPA][10]
* [OpenShift Broker + IPA with Dynamic DNS and GSS-TSIG Updates][11]
* [OpenShift Enterprise with IPA and Windows Active Directory][12].

Relevant blog posts written and talks given while at Red Hat:

* [DefCon for Pythonistas: PRISM][prism]
* [Explain like I'm 5: Kerberos][kerb]
* Netsec for n00bs part [1][netsec1], part [2][netsec2], part [3][netsec3]
* [DjangoCon EU][djangocon]: Introduce Django to your old friends.


[1]: http://freeipa.org
[2]: https://github.com/openshift/origin-server
[3]: https://github.com/openshift/puppet-openshift_origin
[5]: https://github.com/openshift/rhc
[6]: http://www.redhat.com/products/cloud-computing/openshift-enterprise/
[7]: https://github.com/econchick/IPA-Puppet-Simple
[8]: https://github.com/econchick/ipa-ose-vagrant
[9]: https://gist.github.com/econchick/99699a6fee2eb44d13b0
[10]: http://www.freeipa.org/page/OpenShift_Broker_Apache_%2B_mod_auth_kerb_for_IdM
[11]: http://www.freeipa.org/page/OpenShift_Broker_and_IPA_DNS_Server_with_Dynamic_Updates_with_GSS-TSIG
[12]: http://www.freeipa.org/page/OpenShift_Enterprise_on_top_of_a_trust_between_IPA/IdM_and_Windows_Active_Directory
[13]: https://fedorahosted.org/freeipa/ticket/3588
[14]: https://fedorahosted.org/freeipa/ticket/3664
[15]: http://www.freeipa.org/page/Plan:_FreeIPA_and_OpenShift_Enterprise_integration_with_Puppet
[prism]: {{ get_url("prism")}}
[kerb]: {{ get_url("words/explain-like-im-5-kerberos")}}
[netsec1]: {{ get_url("words/netsec-for-n00bs-part-i-password-storage")}}
[netsec2]: {{ get_url("words/netsec-for-n00bs-part-ii-ciphers-symmetric")}}
[netsec3]: {{ get_url("words/netsec-for-n00bs-part-iii-simple-intro-public-key-crypto")}}
[djangocon]: http://2013.djangocon.eu/talks/#5